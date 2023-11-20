import * as housingService from '../services/housing-services.js';
import { setErrorResponse, setResponse } from './response-handler.js';

export const getHousing = async (request, response) => {
    try{  
        const housinglist = await housingService.fetchAllHousing(request.query);
        response.json(housinglist);
        setResponse(housinglist, response)
    } catch (err) {
        setErrorResponse(err, response)
    }
  }; 