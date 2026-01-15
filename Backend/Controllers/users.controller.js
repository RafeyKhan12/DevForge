import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";
import { User } from "../Models/users.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById({ _id: userID });
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(400, "Error generating access and refresh tokens");
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(404, "Missing refresh token");

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user || user.refreshToken !== incomingRefreshToken)
    throw new ApiError(401, "Invalid Refresh Token");

  const newAccessToken = user.generateAccessToken();

  const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken: newAccessToken,
        },
        "Access Token Refreshed"
      )
    );
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

// For Clients

const createAccount = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (
    [username, email, password, confirmPassword].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password does not match, please try again.");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists, please log in.");
  }

  const userCount = await User.countDocuments();

  const user = await User.create({ username, email, password, role: userCount === 0 ? "admin" : "client" });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User cannot be created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const userLogIn = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || (!username && !email)) {
  throw new ApiError(400, "Credentials required");
}

  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).select("+password");

  if (!user) throw new ApiError(401, "Invalid Credentials");

  const passwordCheck = await user.isPasswordCorrect(password);

  if (!passwordCheck) {
    throw new ApiError(400, "Invalid Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
        },
        "User logged in successfully"
      )
    );
});

const userLogOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      refreshToken: undefined,
    },
    {
      new: true,
    }
  );

  const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const editAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById({ _id: userId }).select("+password");

  if (!user) throw new ApiError(401, "Invalid Credentials");

  const { username, newPassword, oldPassword } = req.body;

  if (!username && !newPassword) {
    throw new ApiError(400, "Atleast one field is required to update");
  }

  if (oldPassword || newPassword) {
    if (!oldPassword) {
      throw new ApiError(400, "Old Password is required");
    }

    const passwordCheck = await user.isPasswordCorrect(oldPassword);

    if (!passwordCheck) {
      throw new ApiError(400, "Password does not match");
    }

    user.password = newPassword;
  }

  if (username) {
    const exists = await User.findOne({username});
    if(exists && exists._id.toString() !== userId.toString()){
      throw new ApiError(400, "Username already taken")
    }
    user.username = username
  };

  const updatedUser = await user.save();

  if (!updatedUser)
    throw new ApiError(500, "Something went wrong while updating the user");

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated Successfully"));
});

const deleteAccount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById({ _id: userId }).select("+password");
  if (!user) throw new ApiError(401, "User does not exist");
  const deletedUser = await User.findByIdAndDelete(userId).select("-password -refreshToken");
  if (!deletedUser)
    throw new ApiError(500, "Something went wrong while deleting the user");
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        deletedUser,
      },
      "User deleted successfully"
    )
  );
});

const getMe = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if(!user) throw new ApiError(404, "User not found");
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      {
        user
      },
      "User fetched successfully"
    )
  )
});

// For Admin

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) throw new ApiError(401, "User not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "User found successfully"
    )
  );
});

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({ role: "client" })
    .select("-password -refreshToken")
    .lean();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        allUsers,
      },
      "Users fetched successfully"
    )
  );
});

export {
  generateAccessAndRefreshToken,
  createAccount,
  userLogIn,
  userLogOut,
  editAccount,
  deleteAccount,
  getUser,
  getAllUsers,
  refreshAccessToken,
  getMe
};
