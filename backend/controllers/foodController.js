import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    });

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food item added successfully",
            food,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error adding food item",
            error: error.message,
        });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            message: "Food items fetched successfully",
           data:foods,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error fetching food items",
            data: foods,
        });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.foodId);
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("Error deleting image file:", err);
        });
        await foodModel.findByIdAndDelete(req.body.foodId);
        res.json({
            success: true,
            message: "Food item removed successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error removing food item",
            error: error.message,
        });
    }
};

export { addFood, listFood, removeFood };
