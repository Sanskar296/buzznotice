import mongoose from "mongoose";
import { config } from "./environment.js";

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    
    // Use environment variable for MongoDB URI, fallback to the cloud connection string
    const MONGODB_URI = config.mongodb.uri;
    
    console.log("MongoDB URI:", MONGODB_URI.replace(/mongodb(\+srv)?:\/\/([^:]+)/, "mongodb$1://******")); // Safe logging

    mongoose.set('debug', config.server.nodeEnv === 'development'); // Only enable debug in development

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
    });
    
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);
    console.log(`Connection state: ${conn.connection.readyState}`);

    // Test the connection with a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));

    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected.');
    });

    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    throw error; // Re-throw to be handled by caller
  }
};

export default connectDB;

