import {db} from "../Libs/db.js"
import bcrypt from "bcryptjs"
import { UserRole } from "../generated/prisma/index.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./env"
})

const Register = async (req, res) => {

    const {email, password ,name} = req.body;


    try {
        //can also validate using a middleware
        if(!email || !password || !name){
            return res.status(200).json({
                message:"plz give email password and username",
                success:false,
            })  
        }

        const extistingUser = await db.User.findUnique({
            where:{
                email
            }
        })
        if(extistingUser){
            return res.status(200).josn({
                message:"user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })

        const token = jwt.sign(
        {
            id:newUser.id,
        }, process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )

    

    res.cookie("jwt",token,{        //we are giving res a superpower of cookie //install cookie-parser
    
            httpOnly:true, //only accesible through http js
            sameSite:"strict", //only accessible when the website opens not when other website redirects to this
            //helps in CSRF attacks 
            secure:process.env.NODE_ENV !== "development", //cookie will be only in HTTPS not in HTTP,
            //but during development u would;nt require https since we wouldnt have SSL key
            maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
    })
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })
    } catch (error) {
        console.error("Error creating user:", error);
            res.status(500).json({
                error:"Error creating user"
            })
    }
}

const login = async(req,res)=>{
    const {email ,passowrd} = req.body;


    if(!email || !passowrd){
        return res.status(200).josn({
            message:"email and passowrd is required"
        })
    }

    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return res.status(200).josn({
                message:"user doesnt exist"
            })
        }

        const isMatch = await bcrypt.compare(passowrd,user.passowrd);

        if(!isMatch){
            return res.status(200).josn({
                message:"Invalid credentials"
            })
        }

        const token =await jwt.sign({
            id:user.id
        },process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }

    )

     res.cookie("jwt" , token , {
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge:1000 * 60 * 60 * 24 * 7 // 7 days
        })

        res.status(200).json({
            success:true,
            message:"User Logged in successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                role:user.role,
                image:user.image //Have to handle in teh future
            }
        })


    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            error:"Error logging in user"
        })
    }
}