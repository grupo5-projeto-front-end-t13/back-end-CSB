import { NextFunction, Request, Response } from "express";
import { inviteRepository } from "../repositories/inviteRepository";



export const validateInviteIdMiddleware  = async (req: Request, res: Response, next: NextFunction) => {
      let id: string = req.params.id
      const invite = await inviteRepository.findOneBy({id: id})
      
      if(!invite) return res.status(404).json({message:"Invalid Invite Id"})

      return next();
    }