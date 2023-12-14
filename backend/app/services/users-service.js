//imports
import User from "../models/users-model.js";
import Token from "../models/tokenModel.js";
import * as TokenService from "../services/tokenService.js";
import * as sendEmail from "../middlewares/sendMail.js";
import bcrypt from 'bcrypt';


import UserNotFoundException from "../exceptions/user-not-found-exception.js";
import UserAlreadyExistsException from "../exceptions/user-already-exists-exception.js";
import AlreadyRegisteredEvent from "../exceptions/already-registered-event.js";
import AlreadyNotRegisteredEvent from "../exceptions/already-not-registered-event.js";

//function to retrive details of all users
export const retrieveAllUsers = async ({params = {}, projection = {password: 0, __v: 0}, maxResult = 250}) => {
    return User.find(params, projection).limit(maxResult).exec();
}

//function to retrive details of users using start and end indices
export const retriveUsersByStartAndEndIndices = async({params = {}, projection = {password: 0, __v: 0}, startIndex = 0, endIndex = 10}) => {
    return User.find(params, projection).skip(startIndex).limit(endIndex - startIndex).exec();
}

export const countUsers = async() => {
    return User.countDocuments();
}

//function to create an user
export const createUser = async (newUser) => {
    let user = await User.findOne({email : newUser.email});
    if(user) {
        throw new UserAlreadyExistsException();
    }
    user = new User(newUser);
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

export const registerForEvent = async(userId, eventId) => {
    const userDetails = await User.findById(userId);
    if(userDetails) {
        const existingUpcomingEvents = userDetails.upcomingEvents;
        if(existingUpcomingEvents.includes(eventId)) {
            throw new AlreadyRegisteredEvent();
        }
        else {
            const updatedDetails = User.findByIdAndUpdate(
                userId,
                { $push: { upcomingEvents: eventId } },
                { new: true }, // To return the updated user
            )
            return updatedDetails;
        }
    }
    else {
        throw new UserNotFoundException();
    }
}

export const unRegisterForEvent = async(userId, eventId) => {
    const userDetails = await User.findById(userId);
    if(userDetails) {
        const existingUpcomingEvents = userDetails.upcomingEvents;
        if(!existingUpcomingEvents.includes(eventId)) {
            throw new AlreadyNotRegisteredEvent();
        }
        else {
            const updatedDetails = User.findByIdAndUpdate(
                userId,
                { $pull: { upcomingEvents: eventId } },
                { new: true }, // To return the updated user
            )
            return updatedDetails;
        }
    }
    else {
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


export const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email does not exist");
    const verify = TokenService.TokenType.VERIFY;
    let token = await TokenService.createToken(user, verify);
    const link = `${process.env.SERVER_URI}:${3000}/passwordReset?token=${token}&id=${email}`;
//     await sendEmail.sendEmail(
//         user.email,
//         link,
//         user.firstName,
//         "passwordResetRequest"
//    );
      sendEmail.sendEmail(new sendEmail.VerificationEmailTemplateOptions(user.email, user.firstName, link), sendEmail.emailTypes.PASSWORD_RESET_REQUEST);
  };

  export const resetPassword = async (email, passwordToken, password) => {
    const hash =  await bcrypt.hash(password, 12);
    await User.updateOne(
      { email },
      { $set: { password: hash } },
      { new: true }
    );
    await TokenService.deleteToken({ token: passwordToken});
  };