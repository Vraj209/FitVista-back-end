import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  Firstname: { type: String},
  Lastname: { type: String },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, default: "Canada" },
  total: { type: Number, required: true }, // Changed from String to Number for better handling of calculations
  paymentIntentId: { type: String }, // This will store Stripe's payment intent ID
  paymentStatus: { type: String, default: "pending" }, // This can track the status of the payment
  items: [
    {
      prodId: { type: String },
    },
  ],
});

export const Checkout = mongoose.model("Checkouts", checkOutSchema);
