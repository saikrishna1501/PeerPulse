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
// Importing express-fileupload to upload files
import fileUpload from "express-fileupload"
 
const initialize = async(app) => {
    dotenv.config();
    // Enable Cross-Origin Resource Sharing (CORS)
    // CORS configuration
    const corsOptions = {
        origin: 'http://localhost:3000', //to match the front-end URL
        credentials: true, // as front-end needs to send cookies and authentication details
    };
    app.use(cors(corsOptions));
    // Parse incoming JSON requests
    app.use(express.json());
    // Parse cookies
    app.use(cookieParser())
    // Parse incoming URL-encoded requests
    app.use(express.urlencoded());
    // To upload files
    app.use(fileUpload({
        useTempfiles: true
    }))
    // Connect to MongoDB using the provided connection string

    try{
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_DB);
    }
    catch(err){
        console.log(err)
    }

    // Set up routes using the registered router
    registerRouter(app);
}
 
// Export the initialization function for external use 
export default initialize;