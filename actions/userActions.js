"use server";
import bcrypt from 'bcryptjs';
import User from '../models/user';
import connectDb from '../utils/db';
import jwt from "jsonwebtoken";

export async function loginUser(username,password){
    try{
       await connectDb();
        const user=await User.findOne({username});
        if(!user){
            return {
                success:false,
                message:'User not found',
            }
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return {
                success:false,
                message:'Invalid credentials',
            }
        }
        const token=await jwt.sign({id:user._id},process.env.NEXT_PUBLIC_JWT_SECRET,{
            expiresIn:'1d',
        })
        console.log('Token',token);
        return {
            success:true,
            message:'Login successful',
            token
        }
    }catch(err){
        return {
            success:false,
            message:err.message,
        }
    }
    
}
export async function RegisterUser(username,email,password){
    try{
      await connectDb();
        const existingUser = await User.findOne({ username });
        console.log('Register user');
        if(existingUser){
            return {
                success:true,
                message:'Username already exists',
            }
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({username,email,password:hashedPassword});
        await newUser.save();
        
        return {
            success:true,
            message:'User registered successfully',
            
        }
    }catch(err){
        return {
            success:false,
            message:err.message,
        }
    }
   
  
}
