import dotenv from "dotenv";
dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DATABASE } = process.env;

const env = {
  mongodb: {
    user: MONGODB_USER,
    password: MONGODB_PASSWORD,
    database: MONGODB_DATABASE,
  },
};

export default env;
