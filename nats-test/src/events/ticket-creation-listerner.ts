import  { Message } from "node-nats-streaming";
import { Listener } from "../../../common/src/events/base-listerner";
import { TicketCreatedEvent, TicketUpdatedEvent } from '../../../common/src/events/allEvents';
import { Subjects } from "../../../common/src/events/subjects";

export class TicketCreatedListerner extends Listener<TicketCreatedEvent>{
    subject:Subjects.TicketCreated=Subjects.TicketCreated;
    queueGroupName= "payments-service"; 
  
    onMessage(data:TicketCreatedEvent['data'],msg:Message){
      console.log("Event Datt!",data)
      console.log(data.id)
      console.log(data.title)
      console.log(data.price)
      console.log(data.userId)
      msg.ack()
    }
  }

  
export class TicketUpdatedListerner extends Listener<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated=Subjects.TicketUpdated;
    queueGroupName= "payments-service"; 
  
    onMessage(data:TicketUpdatedEvent['data'],msg:Message){
      console.log("Event Datt!",data)
      console.log(data.id)
      console.log(data.title)
      console.log(data.price)
      console.log(data.userId)
      msg.ack()
    }
  }
