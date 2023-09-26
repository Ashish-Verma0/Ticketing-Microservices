import nats, { Stan } from "node-nats-streaming";
import { TicketCreatedListerner, TicketUpdatedListerner } from "./event/listener";

class NatsWrapper {
  private _client?: Stan;

  get client(){
    if(!this._client){
        throw new Error("cannot access NATS client  before connecting");   
    }else{
        return this._client
    }
  }
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve,reject)=>{
        this.client.on("connect", () => {
        new TicketCreatedListerner(this.client).listen()
        new TicketUpdatedListerner(this.client).listen()

          console.log("Connected to NATS");
          resolve()
        });
        this.client.on("error", (err) => {
          reject(err)
        });
    })
 
  }
}

export const natsWrapper = new NatsWrapper();
