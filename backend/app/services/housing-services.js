import Housing from '../models/housing-model.js';

export const fetchAllHousing = async(filters) => {
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
    return await Housing.find(query);
};