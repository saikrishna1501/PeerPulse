import { apiCallBegan } from "../api";
import axios from 'axios';

const api = ({ dispatch } : any) => (next : any) => async (action : any) => {

    //Check if action type is not apiCallBegan then go to next middleware
    if(action.type !== apiCallBegan.type ) return next(action);

    // Fetch API call details
    const { url, method, data, onSuccess, onError } = action.payload;

    // Call next middleware - continue execution in middleware chain
    next(action); 

    // Resolved: Dispatch onSuccess
    try{
        const response = await axios.request({
            baseURL : `http://localhost:5001`,
            url,
            data,
            method,
            withCredentials: true
        });
        dispatch({ type: onSuccess, payload : response.data }); 
    }
    // Rejected: Dispatch onError
    catch(error){
        dispatch({ type : onError, payload : error });
    }
}

export default api;