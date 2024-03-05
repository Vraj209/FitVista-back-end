import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add a new product
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, category, shortDescription, description, image } =
      req.body;
    const product = new Product({
      name,
      price,
      category,
      shortDescription,
      description,
      image,
    });
    const savedProduct = await product.save();
    res.status(200).json({
      message: "Product added successfully",
      savedProduct,
      status: 200,
    });
  } catch (error) {
    console.log("Error in adding product", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      res.status(200).json({
        message: "Product deleted successfully",
        status: 200,
      });
    } else {
      res.status(404).json({ message: "Product not found", status: 404 });
    }
  } catch (error) {
    console.log("Error in deleting product", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

// Get all product
const getProducts = asyncHandler(async (req, res) => {
  try {
      const products = await Product.find();
      const numberOfProducts = products.length;
    res.status(200).json({ products,numberOfProducts, status: 200 });
  } catch (error) {
    console.log("Error in getting products", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

// Get a single product
const getProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({ product, status: 200 });
    } else {
      res.status(404).json({ message: "Product not found", status: 404 });
    }
  } catch (error) {
    console.log("Error in getting product", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, category, shortDescription, description, image } =
      req.body;
    const product = await Product.findById(productId);
    if (product) {
      product.name = name;
      product.price = price;
      product.category = category;
      product.shortDescription = shortDescription;
      product.description = description;
      product.image = image;
        const updatedProduct = await product.save();
        console.log("Product updated successfully", updatedProduct);
      res.status(200).json({
        message: "Product updated successfully",
        updatedProduct,
        status: 200,
      });
    } else {
      res.status(404).json({ message: "Product not found", status: 404 });
    }
  } catch (error) {
    console.log("Error in updating product", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

export { addProduct, deleteProduct, getProducts, getProduct, updateProduct };
