import authDatabase from "../model/auth.model";
// import createError from "../../../common/src/errorHandler";
import sendToken from "../utils/sendToken";
const createError = (status: number, message: string): Error => {
  const err = new Error(message);
  (err as any).status = status;
  return err;
};
const createUser = async (req: any, res: any, next: any) => {
  try {
    if (!req.body.email || !req.body.name || !req.body.password) {
      return next(createError(403, "Please Fill All Details"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return next(createError(400, "Invalid Email Format"));
    }
    const alreadyUser = await authDatabase.findOne({ email: req.body.email });

    if (alreadyUser) {
      return next(createError(409, "User Email Already Exists"));
    }
    console.log("ashish kumar", req.body.email);
    const user = await authDatabase.create(req.body);
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;

    const user = await authDatabase.findOne({ email }).select("+password");

    if (!user) {
      return next(createError(404, "user not found"));
    }
    const isPasswordMatched = await user?.comparePassword(password);

    if (!isPasswordMatched) {
      return next(createError(404, "Password not Matched"));
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
};

const LoginUser = async (req: any, res: any) => {
  try {
    const user = await authDatabase.findById(req?.user?.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const signOut = async (req: any, res: any) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "user signOut successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export { createUser, signIn, LoginUser, signOut };
