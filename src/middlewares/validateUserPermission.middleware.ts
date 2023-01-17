import { NextFunction, Request, Response } from "express";

export const validateUserPermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idparam = req.params.id;
  const idtoken = req.user.id;

  if (idparam !== idtoken && !req.user.isAdm)
    return res
      .status(401)
      .json({ message: "User can just update/delete himself" });

  return next();
};
