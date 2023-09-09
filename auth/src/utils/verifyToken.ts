// import createError from "./errorHandler";

// const jwt = require("jsonwebtoken");
// // const createError = require("./errorHandler")

// require("dotenv").config();

// const verifyToken = (req:any, res:any, next:any) => {
//   const token =
//        req.cookies?.token||req?.headers?.authorization?.split(" ")[1];

//   if (!token) {
//     // return res.status(401).json({
//     //   success: false,
//     //   message:"User Not Authenticated"
//     // })
//     return next(createError(401, "User Not Authenticated"));
//   }
//   // console.log(token);

//   jwt.verify(token, process.env.JWT_SECRET, (err:any, user:any) => {
//     if (err) {
//     //   return res.status(401).json({
//     //   success: false,
//     //   message:"Token Is Invalid"
//     // })
//       return next(createError(401, "Token Is Invalid"));
//     }
//     req.user = user;

//     next();
//   });
// };

// export {

//   verifyToken,

// };
