import { Request,Response } from "express"
import { bandListIdService } from "../../services/band/bandListId.service"

export const bandListIdController = async (req:Request,res:Response) => {
    const id:string = req.params.id
    const band = await bandListIdService(id)
    return res.status(200).json(band)
}