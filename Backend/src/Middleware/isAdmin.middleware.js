import { ApiError } from "../Utils/ApiError.js";


const adminCheck = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json(new ApiError(403, "Access denied. Admins only."));
  }
};

export { adminCheck };
