// Importing the Express framework
import express from 'express'; 
// Importing CORS middleware for handling cross-origin requests
import cors from 'cors';
// Importing Mongoose for MongoDB interactions
import mongoose from 'mongoose';
// Importing the router setup
import registerRouter from './routes/index.js';
// Importing dotenv to read environment variables
import dotenv from 'dotenv';
// Importing cookie-parser to parse cookies
import cookieParser from "cookie-parser";
 
const initialize = (app) => {
    dotenv.config();
    // Enable Cross-Origin Resource Sharing (CORS)
    app.use(cors());
    // Parse incoming JSON requests
    app.use(express.json());
    // Parse cookies
    app.use(cookieParser())
    // Parse incoming URL-encoded requests
    app.use(express.urlencoded());
    // Connect to MongoDB using the provided connection string
    mongoose.connect(process.env.MONGO_DB);
    // Set up routes using the registered router
    registerRouter(app);
}
 
// Export the initialization function for external use 
export default initialize;