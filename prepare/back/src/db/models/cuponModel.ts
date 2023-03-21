import { Schema, Document } from "mongoose";
import { Coupon } from "../../types/cuponType";
const mongoose = require("mongoose");

export interface CouponDocument extends Coupon, Document {}

const CouponSchema = new Schema<Coupon>(
  {
    title: { type: String, required: true, unique: true },
    couponNumber: { type: String, required: true },
    lastDay: { type: String, required: true },
    image: { type: [String], required: true },
  },
  { timestamps: true, collection: "coupon", versionKey: false }
);

module.exports = mongoose.model("Coupon", CouponSchema);
