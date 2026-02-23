import express from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/inventoryController.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Add a new product
router.post("/addproduct", addProduct);   

// Update a product
router.put("/updateproduct/:productId", updateProduct);

// Delete a product
router.delete("/deleteproduct/:productId", deleteProduct);

export default router;