import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text:{
        type: String,
    },
    image:{
        type: String,
    },
},
{timestamps: true});


const Message = mongoose.model("message", messageSchema);
export default Message;