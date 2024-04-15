import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        shortDescription: {
            type:String,
        },
        image: {
            type: String,
            required: true
        }
    }]
});

export const Cart = mongoose.model("Cart", cartSchema);
