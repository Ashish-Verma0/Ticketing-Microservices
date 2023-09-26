import {Publisher} from "../../../common/src/events/base-publisher"
import { Subjects } from '../../../common/src/events/subjects';
import {TicketCreatedEvent, TicketUpdatedEvent} from "../../../common/src/events/allEvents"


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated=Subjects.TicketCreated
}

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated=Subjects.TicketUpdated
}