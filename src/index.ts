import express, {Request, Response} from "express";
import cors from "cors";
import  "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import {v2 as cloudinary} from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import RestaurantRoute from "./routes/RestaurantRoute";
import orderRoute from  "./routes/OrderRoute";


mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(()=> console.log("connected to db"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async(req:Request, res:Response)=>{
    res.send({message:"health ok!"})
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute)
app.use("/api/order", orderRoute);

app.listen(7000, () => {
    console.log("server started on localhost:7000");
});