import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { iLogin } from "../interfaces/login.intefaces";
import { userRepository } from "../repositories/userRepository";

export const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: iLogin = req.body;

    const user = await userRepository.findOneBy({email: email});

    if(!user) return res.status(403).json({ message: "Wrong email or password" });

    const passwordCompare = await compare(password, user.password);

    if(!passwordCompare) return res.status(403).json({ message: "Wrong email or password" });

    return next();
}