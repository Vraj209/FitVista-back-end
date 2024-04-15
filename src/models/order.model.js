import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    orderDate: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    products: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number,
        color: String,
        imageSrc: String
    }],
    shippingInfo: {
        name: String,
        address: String,
        phone: String
    },
    paymentInfo: {
        lastFourDigits: String,
        expiration: String,
        cardType: String  // Optional: Add more fields as necessary
    }
});

export const Order = mongoose.model('Order', orderSchema);
