import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validationSchema = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message).join(', ')
        });
    }
    next();
}

export default validationSchema;