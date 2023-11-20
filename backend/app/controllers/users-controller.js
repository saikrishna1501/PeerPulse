import * as userService from '../services/users-service.js';
import { setErrorResponse, setResponse } from './response-handler.js';

export const getUsers = async (request, response) => {
    const maxResult = request.query.maxResult;
    const allUsers = await userService.retrieveAllUsers({maxResult: maxResult});
    try {
        setResponse(allUsers, response);
    }
    catch(err) {
        setErrorResponse(err, response);
    } 
}

export const saveUser = async(request, response) => {
    const newUser = {...request.body};
    try {
        console.log(newUser);
        const createdUserDetails = await userService.createUser(newUser);
        setResponse({
            message: "Successfully created user",
            userid: createdUserDetails._id
        },response);
    }
    catch(err) {
        setErrorResponse(err, response);
    }
}