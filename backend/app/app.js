import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
 
const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    mongoose.connect("mongodb+srv://admin:Test123@peer-pulse-db.lke6ms9.mongodb.net/dev?retryWrites=true&w=majority");
    registerRouter(app);
}
 
export default initialize;