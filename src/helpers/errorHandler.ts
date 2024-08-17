import { Request, Response, NextFunction } from "express";
import { responseWrapper } from "./responseWrapper";
import logger from "../config/logger";

// Global error handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack); // Log the error stack for debugging purposes

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).json(responseWrapper({
        isSuccess: false,
        message,
    }));
};

export { errorHandler };