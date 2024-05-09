import authModel from "../models/auth.model.js";
import jwt from "jsonwebtoken"

const checkIsAuthenticated = async (req, res, next) => {
  let token;
  console.log(req.headers);
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decRs = jwt.verify(token, "pleasesubscribe");
      // console.log(decRs);
      req.user = await authModel.findById(decRs.UserID);
      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: "unAuthorized User" });
  }

}

export default checkIsAuthenticated;