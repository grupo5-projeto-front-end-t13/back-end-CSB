import { Request, Response } from "express"

export const deleteController = async(req: Request, res: Response) => {
  const id: String = req.params.id
  const user = await deleteService(id)
  return res.status(200).json(user)
  
}