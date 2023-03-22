"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const cuoponRouter_1 = __importDefault(require("./routes/cuoponRouter"));
console.log("version 1");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: ["http://localhost:8070/"] }));
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
if (process.env.NODE_ENV === "production") {
    app.use((0, morgan_1.default)("combined"));
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)());
}
else {
    app.use((0, morgan_1.default)("dev"));
}
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(" 몽고디비 connect!"))
    .catch((err) => console.log(err));
app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../uploads")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/welcome", (req, res) => {
    res.send("welcome");
});
app.use("/api/cuopon", cuoponRouter_1.default);
app.get("/*", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now(),
    });
    res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
});
app.listen(process.env.PORT || 8070, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 8070
  ################################################
`);
});
