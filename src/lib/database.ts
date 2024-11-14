import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const dbConnect = async () => {
  await mongoose.connect(MONGODB_URI as string, { bufferCommands: false });
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
};
