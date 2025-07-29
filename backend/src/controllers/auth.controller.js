import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req, res)=>{
    const {username, email, password} = req.body
    try {

        if(!username || !email || !password){
            return res.status(400).json({message: "please fill in all the fields"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "your password is too short"})
        }
        const user = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
            });
        if(user) return res.status(400).json({message: "username or email already used"})
        
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const newUser = new User({username:username, email:email, password: hashedpassword})

        if (newUser) {
            
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({message: "user created succesfully",
                username: newUser.username,
                _id: newUser._id,
                email: newUser.email,
                profilepic: newUser.profilepic,
            })
        } else {
            console.log(error.message)
            res.status(500).json({message: "error in the user creation"})
        }
    } catch (error) {
        res.status(400).json({message: "something went wrong"})
    }
}


export const login = async (req, res)=>{
    const {username, password} = req.body
    try {
        if(!username || !password){
            return res.status(400).json({message: "please fill in all the fields"})
        }

        const user = await User.findOne({ username});
        
        if(!user){
            return res.status(400).json({message: 'username or password incorrect'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: 'username or password incorrect'})
        }

        generateToken(user._id, res)

        res.status(200).json({message: 'user logged in',
            username: user.username,
            _id: user._id,
            email: user.email,
            profilepic: user.profilepic,
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "error in the user creation"})
    }
}


export const logout = (req, res)=>{
    try {
        res.cookie("jwt", "", {
            maxAge:0
        })
        res.status(200).json({message: "logged out succesfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "error in the user creation"})
    }
}


export const update = async (req, res) =>{
    try {
        const {profilepic} = req.body;
        const userId = req.user._id;
        
        if(!profilepic){
            return res.status(400).json({message: "profile pic required"});
        }

        const updateResponse = await cloudinary.uploader.upload(profilepic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilepic: updateResponse.secure_url}, {new: true})

        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log('an error has occured')
    }
}


export const checkAuth = async (req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something broke!" });
    }
}