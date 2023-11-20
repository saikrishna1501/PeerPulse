import cors from 'cors';
import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
import registerRouter from './routes/index.js';
import express from 'express';
 
const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    // app.use(cookieParser());
    mongoose.connect("mongodb+srv://admin:Test123@peer-pulse-db.lke6ms9.mongodb.net/dev?retryWrites=true&w=majority");
    registerRouter(app);
    //mongodb
}
 
export default initialize;