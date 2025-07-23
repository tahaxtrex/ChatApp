import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"


export const getsidebarusers = async ()=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({Message : "an error has occured"})
    }
}

export const getmessages = async (req, res)=>{ 
    try {
        const {id: userToChatId} = req.params;
        myId = req.user._id;

        chatmessages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId }
        ]
        });

        res.status(200).json(chatmessages)
    } catch (error) {
        console.log(error);
        res.status("404").json({message : 'no message was found'})
    }    
};

export const sendmessage = async (req, res)=>{
    try {
        const {image, text} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        
        let imageURL;
        if(image){
            const imageResponse = await cloudinary.uploader.upload(image);
            imageURL = imageResponse.secure_url;
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            image: imageURL,
            text: text,
        })

        await newMessage.save()

        res.status(200).json(newMessage)

    } catch (error) {
        console.log(error);
        res.status("500").json({message : 'internal error'})
    }
    
}