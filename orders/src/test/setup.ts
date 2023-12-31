import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

declare global {
  namespace NodeJS {
    interface Global {
      signin():string[];
    }
  }
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_SECRET = "ashishverma20032300";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  }as any);
});

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
   await mongo.stop;
  }
 await mongoose.connection.close();
});

(global as any).signin = ()=>{
  const payload={
    id:new mongoose.Types.ObjectId().toHexString(),
    email:"test@test.com"
  }
  const token=jwt.sign(payload,"ashishverma20032300")
  const session={jwt:token}
  const sessionJSON=JSON.stringify(session)
  const base64=Buffer.from(sessionJSON).toString("base64")
  return [`express:sess=${base64}`]
}