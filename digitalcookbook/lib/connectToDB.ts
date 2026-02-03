import mongoose from "mongoose";
//cache this as global.mongoose to prevent multiple connections 
let cached = (global as any).mongoose || { conn: null, promise: null };

//connectToDB() function that returns a connection that is the ONLY connection
export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGODB_URI as string, {
                bufferCommands: false,
            })
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    (global as any).mongoose = cached;

    return cached.conn;
}