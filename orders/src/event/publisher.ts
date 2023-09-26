import {  OrderCancelledEvent, OrderCreatedEvent, } from '../../../common/src/events/allEvents';
import { Publisher } from '../../../common/src/events/base-publisher';
import { Subjects } from '../../../common/src/events/subjects';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject:Subjects.OrderCreated=Subjects.OrderCreated
}

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject:Subjects.OrderCancelled=Subjects.OrderCancelled
}