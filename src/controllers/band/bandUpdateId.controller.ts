import { Request,Response } from "express"
import { bandUpdateIdService } from "../../services/band/bandUpdateId.service"

export const bandUpdateIdController = async( req: Request, res: Response) => {
    const body = req.body
    const id:string = req.params.id
    const band = await bandUpdateIdService(body,id)
    return res.status(200).json(band)

}