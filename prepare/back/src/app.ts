import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";

dotenv.config();

import cuoponRouter from "./routes/cuoponRouter";

console.log("version 1");

const app: Application = express();

const setCrossOriginOpenerPolicyHeader = (
  req: Request,
  res: Response,
  next: Function
) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
};

// Cross-Origin-Opener-Policy 헤더를 설정하는 미들웨어 함수를 등록합니다.
app.use(setCrossOriginOpenerPolicyHeader);

if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log(" 몽고디비 connect!"))
  .catch((err: Error) => console.log(err));

app.use(express.static(path.join(__dirname, "build")));
app.use("/", express.static(path.join(__dirname, "../../uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", (req: Request, res: Response) => {
  res.send("welcome");
});

app.use("/api/cuopon", cuoponRouter);

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8070, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8070
  ################################################
`);
});
