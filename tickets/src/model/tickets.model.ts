import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
require("dotenv").config();

interface ITicketsSchema extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version:number,
  orderId?:string
}

const ticketSchema = new mongoose.Schema<ITicketsSchema>(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
    },
    price: {
      type: Number,
      required: [true, "Price Required"],
      // unique: true,
    },
    userId: {
      type: String,
      required: [true, "UserId Required"],
    },
    version: {
      type: Number,
      default: 0,
    },
    orderId: {
      type: String, 
    },
  },

  { timestamps: true }
);
ticketSchema.set('versionKey','version')
ticketSchema.plugin(updateIfCurrentPlugin)
export default mongoose.model<ITicketsSchema>("ticketsdatabases", ticketSchema);
