const Product = require("../models/Product");


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};


// ADD PRODUCT
const addProduct = async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json(product);

    } catch(error){

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    addProduct
};