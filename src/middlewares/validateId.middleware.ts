import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { userRepository } from "../repositories/userRepository";


export const validateIdMiddleware  = async (req: Request, res: Response, next: NextFunction) => {
      let id: string = req.params.id
      const user = await userRepository.findOneBy({id: id})
      
      if(!user) throw new AppError (404, 'Invalid Id',)

      return next();
    }