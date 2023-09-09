import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";
import startDatabase from "../db/db";

let mongo: MongoMemoryServer;

beforeAll(async () => {
//   mongo = new MongoMemoryServer();
//   const mongoUri = mongo.getUri();

//   await mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }as any);
  await  startDatabase()
});

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

afterAll(async () => {
  if (mongo) {
    await mongoose.disconnect(); // Close the mongoose connection
    await mongo.stop(); // Stop the MongoMemoryServer instance
  }
});
