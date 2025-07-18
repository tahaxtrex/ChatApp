import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv'
import {connectDB} from "./lib/db.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT

app.use('/', authRoutes);


try {
    app.listen(PORT, ()=>{
    console.log("server is running on : " + PORT);
    })
    connectDB();
} catch (error) {
    console.log(error);

}

