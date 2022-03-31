import mongoose from "mongoose";
import { env } from "./constants";

async function connectDB() {
  const { database, password, user } = env.mongodb;
  const URI = `mongodb+srv://${user}:${password}@cluster0.nilqr.mongodb.net/${database}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URI);
    console.log("[DATABASE]: Connected to MongoDB");
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
    process.exit(1);
  }
}

export default connectDB;
