import ticketDatabase from "../model/tickets.model";
// import createError from "../../../common/src/errorHandler";
import { TicketCreatedPublisher, TicketUpdatedPublisher } from "../events/ticket-publisher";
import { natsWrapper } from "../nats-wrapper";

const createError = (status: number, message: string): Error => {
  const err = new Error(message);
  (err as any).status = status;
  return err;
};
const createTicket = async (req: any, res: any, next: any) => {
  try {
    const tickets = await ticketDatabase.create({
      ...req.body,
      userId: req.user.id,
    });

    if (!tickets) {
      return next(createError(500, "something went wrong"));
    }

   await new TicketCreatedPublisher(natsWrapper.client).publish({
      id:tickets._id,
      title:tickets.title,
      price:tickets.price,
      userId:tickets.userId,
      version:tickets.version
    })
    return res.status(201).json({
      success: true,
      message: "ticket created successfully",
      data: tickets,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTicket = async (req: any, res: any, next: any) => {
  try {
    const tickets = await ticketDatabase.find({});

    if (!tickets) {
      return next(createError(404, "No Tickets Found"));
    }
    return res.status(201).json({
      success: true,
      message: "ticket Find successfully",
      data: tickets,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTicketById = async (req: any, res: any, next: any) => {
  try {
    const ticket = await ticketDatabase.findById(req.params.id);

    if (!ticket) {
      return next(createError(404, "No Tickets Found"));
    }
    return res.status(201).json({
      success: true,
      message: "ticket Find successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateTickets = async (req: any, res: any, next: any) => {
  try {
    const ticket = await ticketDatabase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!ticket) {
      return next(createError(500, "something went wrong"));
    }
    if (ticket.orderId) {
      return next(createError(500, "Ticket has book do not updated"));
    }

     new TicketUpdatedPublisher(natsWrapper.client).publish({
      id:ticket._id,
      title:ticket.title,
      price:ticket.price,
      userId:ticket.userId,
      version:ticket.version
    })
    return res.status(200).json({
      success: true,
      message: "ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
  }
};

const usersOrderTickets = async (req: any, res: any, next: any) => {
  try {
    const tickets = await ticketDatabase.find({ userId: req.params.id });

    if (!tickets) {
      return next(createError(404, "No Tickets Found"));
    }

    return res.status(200).json({
      success: true,
      message: "ticket Find successfully",
      data: tickets,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createTicket,
  updateTickets,
  getTicketById,
  getAllTicket,
  usersOrderTickets,
};
