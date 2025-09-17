import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
    code: {
        type: String, 
        unique: [true, "Coupon code is already added"]
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    expirationDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export const Coupon = mongoose.model("Coupon", couponSchema);


Coupon.syncIndexes()
  .then(() => console.log("Indexes synced for Coupon"))
  .catch(err => console.error("Index sync error:", err));
