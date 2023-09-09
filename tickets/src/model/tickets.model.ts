import mongoose from "mongoose";

require("dotenv").config();

interface ITicketsSchema extends mongoose.Document {
  title: string;
  price: Number;
  userId: string;
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
  },

  { timestamps: true }
);

export default mongoose.model<ITicketsSchema>("ticketsDatabase", ticketSchema);
