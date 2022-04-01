import mongoose from "mongoose";
import { env } from "./constants";
import { Logger } from "./utils/logger";

async function connectDB() {
  const { database, password, user } = env.mongodb;
  const URI = `mongodb+srv://${user}:${password}@cluster0.nilqr.mongodb.net/${database}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URI);
    Logger.success("Database", "Connected to MongoDB");
  } catch (error) {
    Logger.error("db", (error as Error)?.message);
    mongoose.disconnect();
    process.exit(1);
  }
}

export default connectDB;
