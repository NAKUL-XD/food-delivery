import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import paymentRoute from './routes/paymentRoute.js';
import orderRoutes from './routes/orderRoutes.js';






//app config
const app = express()
connectDB();
const port = 3000



//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


//api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads')); // Serve static files from the uploads directory
app.use('/api/user', userRouter); // Assuming you have userRouter defined
app.use("/api/cart",cartRouter); // Assuming you have cartRouter defined
app.use('/api/payment', paymentRoute);
app.use("/api/order", orderRoutes);


app.get('/', (req, res) => {
    res.send("API is running")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
