import nats, { Stan } from "node-nats-streaming";
import { OrderCreatedListerner } from "./events/listener";

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
          console.log("Connected to NATS");
          new OrderCreatedListerner(this.client).listen()
          resolve()
        });
        this.client.on("error", (err) => {
          console.log("err",err)
          reject(err)
        });
    })
 
  }
}

export const natsWrapper = new NatsWrapper();
