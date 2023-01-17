import { Request, Response } from "express";
import { userVerifyService } from "../../services/user/userVerify.service";

export const userVerifyController = async (req:Request,res:Response)=>{
    const id:string = req.params.id
    const message = await userVerifyService(id)

    return res.status(200).json(message)
}