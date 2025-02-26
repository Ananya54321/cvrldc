import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(process.env.NEXT_PUBLIC_MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("database connection error", err);
    throw new Error(err);
  }
};

export default connectDB;
