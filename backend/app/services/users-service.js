//imports
import User from "../models/users-model.js";
import UserNotFoundException from "../exceptions/user-not-found-exception.js";

//function to retrive details of all users
export const retrieveAllUsers = async ({params = {}, projection = {password: 0, __v: 0}, maxResult = 250}) => {
    return User.find(params, projection).limit(maxResult).exec();
}

//function to create an user
export const createUser = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}

// find using the activation code specific to user
export const findByUniqueString=async(activationToken)=>{
    const user = await User.findOne({activationToken})
    if(user){
        return user;
    }
    else {
        //if user doesn't exit, throw exception
        throw new UserNotFoundException();
    }
}
//function to find an user by id
export const findUserById = async(id, projection = {password: 0, __v: 0}) => {
    const user = await User.findById(id, projection);
    if(user) {
        //if user exists in DB, return user
        return user;
    }
    else {
        //if user doesn't exit, throw exception
        throw new UserNotFoundException();
    }
}


//function to update user details
export const updateUser = async(id, updatedUserDetails, projection = {password: 0, __v: 0}) => {
    return User.findByIdAndUpdate(id, {$set: updatedUserDetails}, {projection: projection, new: true}).exec();
}

//function to delete an user
export const deleteUser = async(id, projection = {password: 0, __v: 0}) => {
    return User.findByIdAndDelete(id, {projection: projection}).exec();
}

//function to find user by email(index)
export const findUserByEmail = async(email) => {
    const user = await User.findOne({email});
    if(user) {
        //if user exists in DB, return user
        return user;
    }
    else {
        //if user doesn't exit, throw exception
        throw new UserNotFoundException();
    }
}