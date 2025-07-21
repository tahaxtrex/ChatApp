import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({message : 'failed authentification'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "the token used is invalid, or does not exit"})
    }

}