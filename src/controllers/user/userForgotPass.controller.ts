import { Request, Response } from "express";
import { userForgotPassService } from "../../services/user/userForgotPass.service";

export const userForgotPassController = async (req:Request,res:Response)=>{
    const {email} = req.body
    const message = await userForgotPassService(email)

    return res.status(200).json(message)
}