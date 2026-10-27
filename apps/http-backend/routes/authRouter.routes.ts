import { Router } from "express";
import {prisma} from "@repo/db/client"
import {registerSchema,loginSchema, zodErrorMessage} from "@repo/common/common"
import  { hash } from "bcrypt"
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"
export const authRouter = Router();



authRouter.post("/register", async (req,res) => {
    //emial password
    const {sucess , data, error} = registerSchema.safeParse(req.body)

    if(!sucess){
        res.status(403).json({
            message:zodErrorMessage({ error })
        })
        return;
    }

    const {email,password} = data;

    const existinguser = await prisma.user.findUnique({
        where:{email}
    })
    if(existinguser){
        res.json(403).json({
            message:"user already exists"
        })
        return;
    }

    const username = email.split("@")[0];
    const hashedpassword = await hash(password,7)
    await prisma.user.create({
        data:{
            email,
            password : hashedpassword,
            username,
        }
    })
    return res.status(201).json({
        message:"registration sucessfull"
    })
})



authRouter.post("/login", async (req,res) => {
    const {sucess , data, error} = loginSchema.safeParse(req.body)

    if(!sucess){
        res.status(403).json({
            message:zodErrorMessage({ error })
        })
        return;
    }

    const {email,password} = data;

    const existinguser = await prisma.user.findUnique({
        where:{email}
    })
    if(!existinguser){
        res.json(403).json({
            message:"user not found"
        })
        return;
    }

   
    const isPasswordValid = await compare(password,existinguser.password)
    
    if(!isPasswordValid){
        res.status(403).json({message:"invalid password"})
        return;
    }

    const token = sign({userId: existinguser.id}, JWT_SECRET)

    return res.status(201).json({
        message:"login sucessfull",
        data:{token}
    })
})


authRouter.post("/me", auth , async (req,res) => {
    const { userId } = req.user.userId;

    const user = await prisma.user.findFirst({
        where : { id: userId},
        omit :{
            password: true
        }
    })
    return res.json({message: "user found", data:{ user }})
})