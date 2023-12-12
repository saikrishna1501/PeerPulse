import { apiCallBegan } from "../api";

const checkDataInStore = ({ dispatch, getState } : any) => (next : any) => async (action : any) => {

    //Check if action type is not apiCallBegan then go to next middleware
    if(action.type !== apiCallBegan.type ) return next(action);

  // Fetch API call details
  const { dataInStoreCheck, onSuccess, onError } = action.payload;

  // Check if dataInStoreCheck field is not provided, bypass the middleware
  if (!dataInStoreCheck) {
    next(action);
    return;
  }

  // Check if data exists in the store based on the provided path
  const dataInStore = getNestedValue(getState(), dataInStoreCheck.split('.'));

  if (!dataInStore) {
    next(action);
    return;
  }

};

// Helper function to get nested values in an object
const getNestedValue = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
};

export default checkDataInStore;
