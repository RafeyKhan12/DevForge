import { ApiError } from "../Utils/apiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

const isClient = asyncHandler(async(req, res, next) => {
    if(!req.user || req.user.role !== "client"){
        throw new ApiError(403, "Log In required");
    };
    next();
});

export { isClient };