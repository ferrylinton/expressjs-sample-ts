import { ErrorRequestHandler } from "express";
import { logger } from "../configs/winston";

export const restErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500);
    res.json({ "message": err.message });
};