import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    unit: {
        type: String,
        default: 'Pack'
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
