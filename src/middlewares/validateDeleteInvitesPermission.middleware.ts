import { NextFunction, Request, Response } from "express";
import { inviteRepository } from "../repositories/inviteRepository";

export const validateDeleteInvitesPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const idparam = req.params.id
  const idtoken = req.user.id;
  
  const findInvite = await inviteRepository.findOne({
    where: { 
      id: idparam 
    }, relations: {
      userIdSend: true,
      userIdReceive: true
    }
  });

  if((idtoken !== findInvite?.userIdSend.id) && (idtoken !== findInvite?.userIdReceive.id)) return res.status(401).json({message: 'User can just delete his invites'});

  return next();
}