import { User } from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register= async()=>{
    try {
        const {name, email, password}= req.body

        const existingUser= await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                message:"user already present",
                success:false
            })
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message:"user created successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email
            },
            success:true
        })

    } catch (error) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
}

export const login= async()=>{
    try {
        const {email, password}= req.body

        const user= await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"user not found, register user",
                success:false
            })
        }

        const isMatch= await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message:"Password not matched try again",
                success:false
            })
        }
        
        const token= jwt.sign({
            userId:user._id
        }, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({
            token, 
            user:{
                id:user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
}