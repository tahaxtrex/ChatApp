import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import {connectDB} from "./lib/db.js"
import cors from 'cors'
import User from "./models/user.model.js"


const app = express();
dotenv.config();
const PORT = process.env.PORT

app.use(express.json())
app.use(urlencoded({
    extended:true
}))
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173", // frontend's real domain
  credentials: true
}));


app.use('/auth', authRoutes);
app.use('/message', messageRoutes);


try {
    await connectDB();
    app.listen(PORT, ()=>{
    console.log("server is running on : " + PORT);
    })
    
} catch (error) {
    console.log(error);

}

