import cors from 'cors';
import { urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import registerRouter from './routes/index.js';
 
const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(urlencoded());
    //TODO: MongoDB connection
    mongoose.connect('mongodb+srv://info6150:Bomj4nDic2pgC2wd@cluster0.0urxijg.mongodb.net/coursedb?retryWrites=true&w=majority')
    //TODO: Initialize routes
    registerRouter(app);
}
 
export default initialize;