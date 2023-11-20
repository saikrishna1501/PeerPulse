import User from "../models/users-model.js";

export const retrieveAllUsers = async ({params = {}, projection = {password: 0}, maxResult = 250}) => {
    return User.find(params, projection).limit(maxResult).exec();
}

export const createUser = async (newUser) => {
    const user = new User(newUser);
    return user.save();
}