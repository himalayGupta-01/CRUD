import express from "express";
import routes from "./routes/StudentRoutes.js";
// import { connectDB } from "./database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

const app=express();
const PORT= 8000;

dotenv.config();

// connectDB();
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}));
app.use(express.json());
app.use("/",routes);
app.use(express.urlencoded({extended:false}));

app.listen(PORT,()=>{
    console.log(`App Running at http://localhost:${PORT}`);
})