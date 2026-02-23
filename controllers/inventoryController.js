import express from 'express';
import { readProducts, writeProducts } from '../models/inventoryModel.js';

// Get all products
export const getProducts = (req, res)=>{
    try{
        const products = readProducts();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:"Error reading products"});
    }
    
};

// Add a new product
export const addProduct = (req, res)=>{
    try{
        const { productId, productName, description,Stock } = req.body;
    if(!productId || !productName || !description || !Stock){
        res.status(400).json({message: "All fields are required"});
    }
    const products = readProducts();
    const existingProduct = products.find(p => p.productId === productId);
    if(existingProduct){
        res.status(400).json({message: "Product with this ID already exists in inventory"});
    }

    const newProduct = {productId, productName, description, Stock};
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json({message: "Product added successfully", product: newProduct});
    }catch(error){
        res.status(500).json({message:"Error adding product to inventory"});
    };  
};

export const deleteProduct = (req, res)=>{
    try{
        const productID = parseInt(req.params.productId);
        const products = readProducts();
        const productExists = products.find(p => p.productId === productID);
        if(!productExists){
            res.status(404).json({message: "Product not found in inventory"});
        }
        const updatedProducts = products.filter(p => p.productId !== productID);
        writeProducts(updatedProducts);
        res.status(200).json({message: "Product deleted successfully"});    
    }catch(error){
        res.status(500).json({message:"Error deleting product from inventory"});
    }
};

export const updateProduct = (req, res)=>{
    try{
        const productID = parseInt(req.params.productId);
        const { productName, description, Stock } = req.body;
        const products = readProducts();
        const productIndex = products.findIndex(p => p.productId === productID);
        if(productIndex === -1){
            res.status(404).json({message: "Product not found in inventory"});
        }

        // if(productName !==undefined) products[productIndex].productName = productName;
        // if(description !==undefined) products[productIndex].description = description;
        // if(Stock !==undefined) products[productIndex].Stock = Stock;

        if(!productName || !description || Stock==undefined){
            res.status(400).json({message: "All fields are required"});
        }
        products[productIndex] = { productId: productID, productName, description, Stock };
        writeProducts(products);
        res.status(200).json({message: "Product updated successfully", product: products[productIndex]});
    }catch(error){
        res.status(500).json({message:"Error updating product in inventory"});  
    }
};

