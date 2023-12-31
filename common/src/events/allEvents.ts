import { Subjects } from './subjects';
import {OrderStatus} from "../types/order-status"

export interface TicketCreatedEvent{
    subject:Subjects.TicketCreated

    data:{
        id:string,
        version:number,
        title:string,
        price:number,
        userId:string
    }
}

export interface TicketUpdatedEvent{
    subject:Subjects.TicketUpdated

    data:{
        id:string,
        version:number,
        title:string,
        price:number,
        userId:string
        orderId?:string
    }
}

export interface OrderCreatedEvent{
    subject:Subjects.OrderCreated

    data:{
        _id:string,
        userId:Object,
        status:OrderStatus,
        expiresAt:string,
        ticket:Object,
        version:number
    }
}
export interface OrderCancelledEvent{
    subject:Subjects.OrderCancelled

    data:{
        _id:string,
        // userId:string,
        // status:OrderStatus,
        // expiresAt:string,
        version:number
        ticket:Object,
    }
}
export interface ExpirationCompleteEvent{
    subject:Subjects.ExpirationComplete

    data:{
      orderId:string
    }
}