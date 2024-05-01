const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      enum: ["in progress", "success", "fail"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
