import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from 'dotenv'
import {connectDB} from "./lib/db.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT

app.use(express.json())
app.use(urlencoded({
    extended:true
}))

app.use('/', authRoutes);


try {
    await connectDB();
    app.listen(PORT, ()=>{
    console.log("server is running on : " + PORT);
    })
    
} catch (error) {
    console.log(error);

}

