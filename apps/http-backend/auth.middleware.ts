import {Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken";

export const auth = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const bearerToken = req.headers.authorization;

    if(!bearerToken){
        res.status(401).json({message:"invalid token"})
        return;
    }

    const extractedToken = bearerToken.split("bearer ")[1]

    if(!extractedToken){
        res.status(401).json({message:"invalid token"})
        return;
    }

    const decoded = verify(extractedToken, JWT_SECRET)

    req.userId = decoded;
    next()
    } catch (error) {
        res.status(401).json({message:"invalid token"})
        return;
    }
}