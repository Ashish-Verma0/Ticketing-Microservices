import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
require("dotenv").config()

interface IAuthSchema extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  getJwtToken(): Promise<string>;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const authSchema = new mongoose.Schema<IAuthSchema>(
  {
    name: {
      type: String,
      required: [true, "UserName Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "password Required"],
    },
  },
  {
    toJSON: {
      transform(doc,ret) {
        delete ret.password
      }
    },
  },
  // { timestamps: true },
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

authSchema.methods.getJwtToken = async function () {
  return jwt.sign({ id: this._id,email:this.email },process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// console.log("ashish", process.env.JWT_SECRET, process.env.JWT_EXPIRE)

authSchema.methods.comparePassword = async function (enteredPassword:string) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IAuthSchema>("authDatabase", authSchema);
