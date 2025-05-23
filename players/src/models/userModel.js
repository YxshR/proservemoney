
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
        
    },
    email : {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
        },
    password : {
        type: String,
        required: [true, "Please provide a password"],
        select: false
        
    },
    isVerfied:{
        type:Boolean,
        default:false
        
    },

    isAdmin:{
        type:Boolean,
        default:false        
    },

    forgotPasswordToken: String,
    forgotPasswordExpires: Date,
    verifyToken: String,
    verifyTokenExpires: Date,

})


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User