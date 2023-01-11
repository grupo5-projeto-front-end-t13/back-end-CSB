import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validateDataMiddleware =
  (serializer: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedData;

      next();
    } catch (error: any) {
      return res.status(400).json({ message: error.errors });
    }
  };
