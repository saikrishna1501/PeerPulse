//Import housingService for fetching housing data and response-handler for handling responses.
import * as housingService from '../services/housing-services.js';
import { setErrorResponse, setResponse } from './response-handler.js';

export const getHousing = async (request, response) => {
    try{  
        // Fetch housing data based on query parameters
        const housinglist = await housingService.fetchAllHousing(request.query);
        // Send JSON response with the fetched housing data
        response.json(housinglist);
         // Set custom response headers or perform additional response handling
        setResponse(housinglist, response)
    } catch (err) {
        // Handle errors and set error response
        setErrorResponse(err, response)
    }
  }; 