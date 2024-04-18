import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Checkout } from "../models/checkout.model.js";
import nodemailer from "nodemailer";
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
      amount: total * 100,
      currency: "cad",
      receipt_email: email,
      metadata: { userid },
    });

    // Here you can save the checkout details along with paymentIntent.id to your database
    const newCheckout = new Checkout({
      ...req.body,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "pending",
    });

    await newCheckout.save();
    if (newCheckout) {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "aproject7799@gmail.com",
          pass: "elwmgxaxkmkxaxna",
        },
      });
      
      const mailOptions = {
        from: "aproject7799@gmail.com",
        to: email,
        subject: "Order confirmed successfully",
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #007bff;
            }
            p {
                margin: 10px 0;
            }
            .order-details {
                margin-top: 20px;
                border-top: 1px solid #ccc;
                padding-top: 20px;
            }
            .thank-you {
                text-align: center;
                margin-top: 30px;
                font-size: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Order Confirmation</h1>
            <p>Dear User,</p>
            <p>We're happy to inform you that your order has been successfully placed. Below are the details of your order:</p>
            <div class="order-details">
              
              
                <p><strong>Shipping Address:</strong> ${address}</p>
                
                <p><strong>Order Total:$</strong> ${total}</p>
            </div>
            <p class="thank-you">Thank you for shopping with us!</p>
        </div>
    </body>
    </html>
`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
    }
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
export { paymentAdd };
