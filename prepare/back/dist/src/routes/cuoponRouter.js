"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Coupon = require("../db/models/cuponModel");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cuoponRouter = (0, express_1.Router)();
try {
    fs_1.default.accessSync("uploads");
}
catch (error) {
    console.log("uploads 폴더가 없으므로 생성합니다.");
    fs_1.default.mkdirSync("uploads");
}
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path_1.default.extname(file.originalname); // 확장자 추출(.png)
            const basename = path_1.default.basename(file.originalname, ext);
            done(null, basename + "_" + new Date().getTime() + ext);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
/**images만 먼저 등록  */
cuoponRouter.post("/images", upload.array("image"), (req, res, next) => {
    // POST /post/images
    console.log(req.files);
    var imageFiles = JSON.parse(JSON.stringify(req.files));
    res.json(imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.map((v) => v.filename));
});
/**모든 inputs을 등록 */
cuoponRouter.post("/", upload.none(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCoupon = new Coupon({
            title: req.body.title,
            couponNumber: req.body.couponNumber,
            lastDay: req.body.lastDay,
            image: req.body.image,
        });
        console.log(" before", newCoupon);
        const saveNewCoupon = yield newCoupon.save();
        console.log("res", saveNewCoupon);
        res.status(200).json(saveNewCoupon);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
/** all get coupon */
cuoponRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCoupon = yield Coupon.find();
        res.status(200).json(allCoupon);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = cuoponRouter;
