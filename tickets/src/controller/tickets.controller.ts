import ticketDatabase from "../model/tickets.model";
import createError from "../../../common/src/errorHandler";
const createTicket = async (req: any, res: any, next: any) => {
  try {
    const tickets = await ticketDatabase.create({
      ...req.body,
      userId: req.user.id,
    });

    if (!tickets) {
      return next(createError(500, "something went wrong"));
    }

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
