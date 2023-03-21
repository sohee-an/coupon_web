import { Request, Response, NextFunction, Router } from "express";
const Coupon = require("../db/models/cuponModel");
import multer from "multer";
import path from "path";
import fs from "fs";

const cuoponRouter = Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, done: Function) {
      done(null, "uploads/");
    },
    filename(req: Request, file: Express.Multer.File, done: Function) {
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
/**images만 먼저 등록  */
cuoponRouter.post(
  "/images",
  upload.array("image"),
  (req: Request, res: Response, next: NextFunction) => {
    // POST /post/images
    console.log(req.files);
    var imageFiles = JSON.parse(JSON.stringify(req.files));

    res.json(imageFiles?.map((v: Express.Multer.File) => v.filename));
  }
);

/**모든 inputs을 등록 */
cuoponRouter.post(
  "/",
  upload.none(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCoupon = new Coupon({
        title: req.body.title,
        couponNumber: req.body.couponNumber,
        lastDay: req.body.lastDay,
        image: req.body.image,
      });

      const saveNewCoupon = await newCoupon.save();
      console.log(saveNewCoupon);
      res.status(200).json(saveNewCoupon);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

/** all get coupon */
cuoponRouter.get("/", async (req, res) => {
  try {
    const allCoupon = await Coupon.find();
    res.status(200).json(allCoupon);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default cuoponRouter;
