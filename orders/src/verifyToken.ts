
const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req: any, res: any, next: any) => {
  const token =
    req.cookies?.token || req?.headers?.authorization?.split(" ")[1];

  if (!token) {
   return res.status(401).json({
      success:false,
      message:"User Not Authenticated"
    })
  }
  jwt.verify(token, "ashishverma20032300", (err: any, user: any) => {
    if (err) {
      return res.status(401).json({
        success:false,
        message:"Token Is Invalid"
      })
    }
    req.user = user;

    next();
  });
};

export { verifyToken };
