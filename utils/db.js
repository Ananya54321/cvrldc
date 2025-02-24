import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(process.env.NEXT_PUBLIC_MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
