import { Request, Response, NextFunction } from "express";
import orderDatabase from "../models/orders.model";
import ticketsdatabases from "../models/ticket.model";
// import createError from "../../../common/src/errorHandler";
// import { OrderStatus } from "../../../common/src/types/order-status";
import {OrderStatus} from "@ashish_tickets/common"
import {
  OrderCancelledPublisher,
  OrderCreatedPublisher,
} from "../event/publisher";
import { natsWrapper } from "../nats-wrapper";
const EXPIRATION_WINDOW_sECONDS = 15 * 60;

const createError = (status: number, message: string): Error => {
  const err = new Error(message);
  (err as any).status = status;
  return err;
};
const createOrder = async (req: any, res: any, next: any) => {
  try {
    const { ticketId } = req.body;
    // find Ticket from databse
    const ticket = await ticketsdatabases.findById(ticketId);

    if (!ticket) {
      return next(createError(404, "Ticket Not Found"));
    }

    // check the existing ticket in order database
    const existingOrders = await orderDatabase.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayments,
          OrderStatus.Completed,
        ],
      },
    });
    if (existingOrders) {
      return next(createError(400, "Ticket Already Booked"));
    }

    // calculate an expiration date on orders of 15 min
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_sECONDS);

    // create an order and save it to database
    const order = await orderDatabase.create({
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
      userId: req.user.id,
    });

    if (!order) {
      return next(createError(400, "Order Not Created"));
    }

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      _id: order._id,
      version:order.version,
      userId: order.userId,
      status: order.status,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        _id: ticket._id,
        title: ticket.title,
        price: ticket.price,
      },
    });

    return res.status(201).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};

const findUserOrders = async (req: any, res: Response, next: NextFunction) => {
  try {
    const userOrders = await orderDatabase
      .find({ userId: req?.user?.id })
      // .populate("ticket");

    if (!userOrders) {
      return next(createError(404, "orders not found"));
    }
    res.status(200).json({
      success: true,
      message: userOrders,
    });
  } catch (error) {
    next(error);
  }
};
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderDatabase.find({});

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(201).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};
const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderDatabase
      .findById(req.params.id)
      // .populate("ticket");

    if (!order) {
      return res.status(404).json({
        message: "Order not found by this id",
      });
    }

    res.status(201).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};
const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderDatabase
      .findByIdAndUpdate(
        req.params.id,
        {
          status: OrderStatus.Cancelled,
        },
        {
          new: true,
        }
      )
      // .populate("ticket");
    console.log(order);
    if (!order) {
      return res.status(404).json({
        message: "Order not deleted. Something went wrong",
      });
    }
    new OrderCancelledPublisher(natsWrapper.client).publish({
      _id: order._id,
      version:order.version,
      ticket: {
        _id: order.ticket._id,
      },
    });
    res.status(201).json({
      success: true,
      message: order,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  findUserOrders,
};
