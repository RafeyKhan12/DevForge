import { User } from "../Models/users.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/apiError.js";
import jwt from "jsonwebtoken";

const verifyTokens = asyncHandler(async (req, res, next) => {
  try{
    const token =
    req.header("Authorization")?.replace("Bearer ", "") ||
    req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken._id)
    .select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  req.user = user;
  next();
  } catch(error){
    console.log("Error in auth: ", error);
  }
});

export { verifyTokens };
