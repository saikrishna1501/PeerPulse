// Importing the Express framework
import express from 'express'; 
// Importing CORS middleware for handling cross-origin requests
import cors from 'cors';
// Importing Mongoose for MongoDB interactions
import mongoose from 'mongoose';
// Importing the router setup
import registerRouter from './routes/index.js';
 
const initialize = (app) => {
    // Enable Cross-Origin Resource Sharing (CORS)
    app.use(cors());
    // Parse incoming JSON requests
    app.use(express.json());
    // Parse incoming URL-encoded requests
    app.use(express.urlencoded());
    // Connect to MongoDB using the provided connection string
    mongoose.connect("mongodb+srv://admin:Test123@peer-pulse-db.lke6ms9.mongodb.net/dev?retryWrites=true&w=majority");
    // Set up routes using the registered router
    registerRouter(app);
}
 
// Export the initialization function for external use
export default initialize;