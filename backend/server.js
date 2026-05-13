const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

    console.log("MongoDB Connected");


    // CHECK PRODUCTS

    const existingProducts = await Product.find();

    if(existingProducts.length === 0){

        await Product.insertMany([

            // SHOES

            {
                name:"Nike Air Max",
                price:3999,
                image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                rating:4.5,
                description:"Running Shoes",
                category:"Shoes"
            },

            {
                name:"Adidas Sneakers",
                price:2999,
                image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
                rating:4.3,
                description:"Casual Sneakers",
                category:"Shoes"
            },

            {
                name:"Puma Sports",
                price:3499,
                image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5",
                rating:4.4,
                description:"Sports Shoes",
                category:"Shoes"
            },


            // WATCHES

            {
                name:"Rolex Watch",
                price:9999,
                image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
                rating:4.8,
                description:"Luxury Watch",
                category:"Watches"
            },

            {
                name:"Fossil Smartwatch",
                price:5999,
                image:"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
                rating:4.5,
                description:"Smart Watch",
                category:"Watches"
            },

            {
                name:"Titan Watch",
                price:3999,
                image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d",
                rating:4.2,
                description:"Classic Watch",
                category:"Watches"
            },


            // ELECTRONICS

            {
                name:"iPhone 15",
                price:79999,
                image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
                rating:4.9,
                description:"Apple Smartphone",
                category:"Electronics"
            },

            {
                name:"Samsung TV",
                price:45999,
                image:"https://images.unsplash.com/photo-1593784991095-a205069470b6",
                rating:4.7,
                description:"Smart LED TV",
                category:"Electronics"
            },

            {
                name:"HP Laptop",
                price:55999,
                image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                rating:4.6,
                description:"Gaming Laptop",
                category:"Electronics"
            }

        ]);

        console.log("Products Inserted");
    }

})

.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("E-commerce API Running");
});

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const Product = require("./models/Product");
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});