// import { ExpirationCompleteEvent } from '../../../common/src/events/allEvents';
// import { Publisher } from '../../../common/src/events/base-publisher';
// import { Subjects } from '../../../common/src/events/subjects';

import {ExpirationCompleteEvent,Publisher,Subjects} from "@ashish_tickets/common"

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete
}