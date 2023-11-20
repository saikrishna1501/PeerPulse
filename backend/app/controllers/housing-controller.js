import * as housingService from '../services/housing-services.js';
import { setErrorResponse, setResponse } from './response-handler.js';

export const getHousing = async (request, response) => {
      const housinglist = await housingService.getHousing(request.query);
      response.json(housinglist);
      try{
        setResponse(housinglist, response)
    } catch (err) {
        setErrorResponse(err, response)
    }
  };