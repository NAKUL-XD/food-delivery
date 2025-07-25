import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import authMiddleware from "../middleware/auth.js";
import multer from 'multer';

const foodRouter = express.Router();

// image storage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", authMiddleware, upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", authMiddleware, removeFood);

export default foodRouter;
