"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const CouponSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    couponNumber: { type: String, required: true },
    lastDay: { type: String, required: true },
    image: { type: [String], required: true },
}, { timestamps: true, collection: "coupon", versionKey: false });
module.exports = mongoose.model("Coupon", CouponSchema);
