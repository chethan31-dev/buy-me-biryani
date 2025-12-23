import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            connectTimeoutMS: 10000, // 10 seconds timeout
        };

        console.log("=> Attempting to connect to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("=> MongoDB Connection Success!");
            return mongoose;
        }).catch(err => {
            console.error("=> MongoDB Connection FAILED.");
            if (err.message.includes("atlas-") || err.message.includes("whitelist")) {
                console.error("💡 HINT: Your IP address might not be whitelisted in MongoDB Atlas. Go to 'Network Access' and add 'Allow Access from Anywhere' (0.0.0.0/0) for testing.");
            }
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDb;