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

export const findUserById = async(request,response) => {
    try {
        const id = request.params.id;
        console.log(id);
        const userDetails = await userService.findUserById(id);
        setResponse(userDetails, response);
    }
    catch(err) {
        setErrorResponse(err, response);
    }
}

export const updateUser = async(request,response) => {
    try {
        const id = request.params.id;
        const userChanges = {...request.body};
        console.log(userChanges);
        const updatedUserDetails = await userService.updateUser(id, userChanges);
        console.log(updatedUserDetails)
        setResponse(updatedUserDetails, response);
    }
    catch(err) {
        setErrorResponse(err, response);
    }
}

export const deleteUser = async(request, response) => {
    try {
        const id = request.params.id;
        const deletedUserDetails = await userService.deleteUser(id);
        console.log("Successfully deleted user", deletedUserDetails);
        setResponse({
            message: `successfully deleted user`
        },response)
    }
    catch(err) {
        setErrorResponse(err, response);
    }
}