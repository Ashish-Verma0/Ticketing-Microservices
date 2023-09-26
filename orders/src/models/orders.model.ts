import mongoose from "mongoose";
import { OrderStatus } from "../../../common/src/types/order-status";
import { TicketDoc } from "./ticket.model";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface IOrderSchema extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version:number
}

const orderSchema = new mongoose.Schema<IOrderSchema>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "userId required"],
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
      required: [true, "status required"],
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
      required: [true, "expireAt required"],
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticketsDatabase",
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
orderSchema.set('versionKey','version')
orderSchema.plugin(updateIfCurrentPlugin)

let orderDatabase = mongoose.model<IOrderSchema>("orderDatabase", orderSchema);

export default orderDatabase;
