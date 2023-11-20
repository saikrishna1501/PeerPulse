import User from "../models/users-model.js";

export const retrieveAllUsers = async ({params = {}, projection = {password: 0, __v: 0}, maxResult = 250}) => {
    return User.find(params, projection).limit(maxResult).exec();
}

export const createUser = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}

export const findUserById = async(id, projection = {password: 0, __v: 0}) => {
    return User.findById(id, projection);
}

export const updateUser = async(id, updatedUserDetails, projection = {password: 0, __v: 0}) => {
    return User.findByIdAndUpdate(id, {$set: updatedUserDetails}, {projection: projection, new: true}).exec();
}

export const deleteUser = async(id, projection = {password: 0, __v: 0}) => {
    return User.findByIdAndDelete(id, {projection: projection}).exec();
}