import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Checkout } from "../models/checkout.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Make sure to configure your secret key in environment variables

// Express route to handle checkout creation
const paymentAdd = asyncHandler(async (req, res) => {
  const {
    userid,
    email,
    total,
    items,
    Firstname,
    Lastname,
    address,
    postalCode,
    city,
    province,
    country,
  } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100, // Convert dollars to cents
      currency: "cad",
      receipt_email: email,
      metadata: { userid }, // Optional: include any additional metadata you find useful
    });

    // Here you can save the checkout details along with paymentIntent.id to your database
    const newCheckout = new Checkout({
      ...req.body,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "pending",
    });

    await newCheckout.save();

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
export { paymentAdd };
