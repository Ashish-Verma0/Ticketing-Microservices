import createError from "./errorHandler";

const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req: any, res: any, next: any) => {
  const token =
    req.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return next(createError(401, "User Not Authenticated"));
  }
  jwt.verify(token, "ashishverma20032300", (err: any, user: any) => {
    if (err) {
      return next(createError(401, "Token Is Invalid"));
    }
    req.user = user;

    next();
  });
};

export { verifyToken };
