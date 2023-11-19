import cors from 'cors';
import { urlencoded } from 'body-parser';
import mongoose from 'mongoose';
 
const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(urlencoded());
    //mongodb
}
 
export default initialize;