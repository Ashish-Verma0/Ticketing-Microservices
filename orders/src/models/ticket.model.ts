import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface TicketDoc extends mongoose.Document {
  _id: string;
  title: string;
  price: number;
  version:number
}

const ticketSchema = new mongoose.Schema<TicketDoc>(
  {
    _id: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    version: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
ticketSchema.set('versionKey','version')
ticketSchema.plugin(updateIfCurrentPlugin)

export default mongoose.model<TicketDoc>("ticketsdatabases", ticketSchema);
