import { Request, Response } from "express";
import { userUpdateService } from "../../services/user/userUpdate.service";

export const userUpdateController = async (req:Request,res:Response)=>{
    const updatedUser = await userUpdateService(req.body,req.params.id)

    return res.status(200).json(updatedUser)
}