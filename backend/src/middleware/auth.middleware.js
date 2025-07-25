import jwt from "jsonwebtoken";
import { db } from "../Libs/db";

export const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt; //name u gave while setting the token


        if(!token){
            return res.status(401).json({
                messgae:"unauthorized person"
            })
        }

        let decoded;
        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET)
        } catch (error) {
            return res.status(401).json({
                messgae:"unauthorized -Invalid token"
            })
        }

        const user = await db.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }
        });

        if(!user){
            return res.status(404).json({
                messgae:"user not found"
            })
        }

        req.user = user;
        next()

    }  catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({message:"Error authenticating user"});
    }
}