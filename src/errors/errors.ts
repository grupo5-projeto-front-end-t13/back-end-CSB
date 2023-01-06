import { NextFunction, Request, Response } from "express";

class AppError extends Error {
    statusCode: number
    
    constructor(statusCode = 400, message: string){
        super()
        this.statusCode = statusCode
        this.message = message
    }
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    console.log(err.message);

    return res.status(500).json({ message: "Internal server error" });

}

export { AppError, errorHandler };