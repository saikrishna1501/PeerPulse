import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
 
const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    //MongoDB connection
    mongoose.connect('<Mongo-url>')
    //Initialize routes
    registerRouter(app);
}
 
export default initialize;