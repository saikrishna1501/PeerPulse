import Housing from '../models/housing-model.js';

export const fetchAllHousing = async(filters) => {
    // Initialize an empty object to store the query parameters
    let result = {};
    if (filters.location) {
        result.location = filters.location;
    }
    if(filters.price) {
        result.price = {
            $gte: filters.price.min,
            $lte: filters.price.max,
        };
    }
    if(filters.bed) {
        result.bed = filters.bed;
    }
    // Fetch housing entries based on the constructed query
    return await Housing.find(result);
};