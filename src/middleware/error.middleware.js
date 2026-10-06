import { ZodError } from "zod";
import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = "Internal server error";
    let errors;

    // ZOD ERROR
    if (err instanceof ZodError) {

        statusCode = 400;
        message = "Validation failed";

        errors = err.issues;
    }

    // DUPLICATE MONGODB KEY
    else if (err.code === 11000) {

        statusCode = 409;
        message = "Resource already exists";
    }

    // MONGOOSE VALIDATION ERROR
    else if (err instanceof mongoose.Error.ValidationError) {

        statusCode = 400;
        message = "Database validation failed";
    }

    // INVALID MONGODB OBJECT ID
    else if (err instanceof mongoose.Error.CastError) {

        statusCode = 400;
        message = "Invalid ID";
    }

    // OUR CUSTOM ERROR
    else if (err.isOperational) {

        statusCode = err.statusCode || 500;
        message = err.message;
    }

    const response = {
        success: false,
        message
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};