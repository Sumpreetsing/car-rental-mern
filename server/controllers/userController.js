import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateToken=(userID)=>{
    const payload=userID;
    return jwt.sign(payload,process.env.JWT_SECRET)
}


// Register user
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name|| !email || !password || password.length<8){
            return res.json({success:false,message:"Fill all the fields"})
        }

        const userExist=await User.findOne({email})

        if(userExist){
            return res.json({success:false,message:"User already exist"})

        }

        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({name,email,password:hashedPassword})
        const token=generateToken(user._id.toString())
        res.json({success:true,token})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}


// User login

export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token=generateToken(user._id.toString())
        res.json({success:true,token})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// get user data using token(jwt)

export const getUserData=async(req,res)=>{
    try {
        const {user}=req;
        res.json({success:true,user})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}