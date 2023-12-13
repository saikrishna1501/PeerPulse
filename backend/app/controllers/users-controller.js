//imports
import PasswordMissMatchError from '../exceptions/password-missmatch-error.js';
import * as userService from '../services/users-service.js';
import {setErrorResponse, setHttpOnlyCookiesAndResponse, setResponse } from './response-handler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {VerificationEmailTemplateOptions, emailTypes, sendEmail} from '../middlewares/sendMail.js'
import * as tokenService from '../services/tokenService.js';
import UserNotFoundException from '../exceptions/user-not-found-exception.js';
import UnverifiedEmailException from '../exceptions/unverified-email-exception.js';

/* Controller function to retrive users. By default, it returns maximum of 250 users.
   Use maxResults query string to alter the maximum user count
*/
export const getUsers = async (request, response) => {
    try {
        //fetch pageSize and pageNumber from query string
        const pageSize = parseInt(request.query.pageSize);
        const pageNumber = parseInt(request.query.pageNumber);
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize; 
        console.log(startIndex, endIndex);
        //retrive users
        const allUsers = await userService.retriveUsersByStartAndEndIndices({startIndex: startIndex, endIndex: endIndex});
        //return the users details
        const totalNumberOfUsers = await userService.countUsers();
        const numberOfPages = Math.ceil(totalNumberOfUsers/pageSize);
        setResponse({users: allUsers, numberOfPages: numberOfPages, pageSize: pageSize}, response);
    }
    catch(err) {
        //return error response
        setErrorResponse(err, response);
    } 
}

export const getNoOfPages = async (request, response) => {
    try {
        const pageSize = parseInt(request.query.pageSize);
        const totalNumberOfUsers = await userService.countUsers();
        const numberOfPages = Math.ceil(totalNumberOfUsers/pageSize);
        setResponse({numberOfPages: numberOfPages}, response);
    }
    catch(err) {
        //return error response
        setErrorResponse(err, response);
    } 
}

// Controller function to store the details of user. Can be used for signing up the user. 
export const saveUser = async(request, response) => {
    //get the user details from the request body
    const newUser = {...request.body};
    try {
        //hash the user password before storing to the DB
        newUser.password = await bcrypt.hash(newUser.password, 12);
        //store user details in db
        const createdUserDetails = await userService.createUser(newUser);
        const {password, createdUserDetailsWithoutPassword} = createdUserDetails;
        //Printing user details(excluding password)
        console.log("Successfully created user", createdUserDetailsWithoutPassword);
        //return userid in response
        setResponse({
            message: "Successfully created user",
            userid: createdUserDetails._id
        },response);
    }
    catch(err) {
        //return error response
        setErrorResponse(err, response);
    }
}

// Controller function to find a user by id.
export const findUserById = async(request,response) => {
    try {
        //extra the userid
        const id = request.params.id;
        //fetch the user details from the DB
        const userDetails = await userService.findUserById(id);
        //return the user details
        setResponse(userDetails, response);
    }
    catch(err) {
        //return error response
        setErrorResponse(err, response);
    }
}

//controller function to update user details
export const updateUser = async(request,response) => {
    try {
        //extract the user id and new changes
        const id = request.params.id;
        const userChanges = {...request.body};
        //update the new details
        const updatedUserDetails = await userService.updateUser(id, userChanges);
        console.log("Updated user details", updatedUserDetails);
        //respond with acknowledgement
        setResponse({
            message: "Successfully updated user",
            userDetails: updatedUserDetails
        }, response);
    }
    catch(err) {
        //return error response
        setErrorResponse(err, response);
    }
}

export const deleteUser = async(request, response) => {
    try {
        //extract the user id
        const id = request.params.id;
        //delete the user from the DB
        const deletedUserDetails = await userService.deleteUser(id);
        console.log("Successfully deleted user", deletedUserDetails);
        //respond with acknowledgement
        setResponse({
            message: `successfully deleted user`,
            userDetails: deletedUserDetails
        },response)
    }
    catch(err) {
        //return error response
        setErrorResponse(err, response);
    }
}

// Controller function for new user to register
export const register = async(req,res)=>{
    try{
        const {firstName, lastName, email, password}= req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({msg: "Please fill in all fields"})
        }
        const passwordHash = await bcrypt.hash(password,12);
        const verification_token = await tokenService.createToken({firstName, lastName, password: passwordHash, email}, tokenService.TokenType.VERIFY);
        const newUser= {firstName, lastName, password: passwordHash, email}
        const userCreated = await userService.createUser(newUser)
        const url=`http://localhost:${process.env.PORT}/users/activate/${verification_token}`
        // sendEmail(email,url, firstName)
        sendEmail(new VerificationEmailTemplateOptions(email, firstName, url), emailTypes.SEND_VERIFICATION);
        res.redirect('back');   
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message});
    }
}

// Controller function to send verification link to user email
export const verifyEmail = async(req,res)=>{
    try{
        let {activation_token}=req.params;
        const tokenDetails = await tokenService.findToken({token: activation_token})
        const user = await userService.findUserByEmail(tokenDetails.email)
        user.isValid=true;
        user.save()
        tokenService.deleteToken(tokenDetails);
            //res.redirect('/users/auth')
    }
    catch(err){
        console.log(err)
    }
}

export const login = async (request, response) => {
    //extract email id and password from request body
    let {email, password} = request.body;
    try {
        //fetch the user details from DB using the email id
        let user = await userService.findUserByEmail(email);
        console.log(user);
        //compare the password with the password hash fetched from the DB
        let isMatch = await bcrypt.compare(password, user.password);
        
        console.log(user)
        if(!user.isValid) {
            throw new UnverifiedEmailException();
        }
        if(isMatch) {
            user = user.toObject();
            delete user.password;
            //if password matches, Sign a token and issue it to the user
            let accessToken = await tokenService.createToken(user, tokenService.TokenType.ACCESS);
            let refreshToken = await tokenService.createToken(user, tokenService.TokenType.REFRESH);
            const result = user;
            //setting the accessToken and refreshToken cookie and user details in response
            setHttpOnlyCookiesAndResponse({
                ...result,
                message: "You have successfully logged in"
            },
            [
                {
                    name: "accessToken",
                    value: accessToken,
                    options: {
                        httpOnly: true,
                        secure: false, // Use 'secure' in production for HTTPS
                        sameSite: 'Strict',
                        maxAge: 10 * 60 * 1000, // 10 minutes
                    }
                },
                {
                    name: "refreshToken",
                    value: refreshToken,
                    options: {
                        httpOnly: true,
                        secure: false, // Use 'secure' in production for HTTPS
                        sameSite: 'Strict',
                        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
                    }
                }
            ],
            response
            )
        }
        else {
            //if password matches, Sign a token and issue it to the user then throw PasswordMissMatchError
            throw new PasswordMissMatchError();
        }
    }
    catch(err) {
        //return error response
        setErrorResponse(err,response);
    }
}

export const validateCookie = (req, res) => {
    // Logic to verify the 'session' cookie and respond
    // jwt.verify(req.cookies.session, process.env.APP_SECRET, (err, decoded) => {
    //   if (err) {
    //     return res.json({ isAuthenticated: false });
    //   }
    //   return res.json({ isAuthenticated: true, user: decoded });
    // });

    const accessToken = request.cookies.accessToken;
    const refreshToken = response.cookies.refreshToken;
    try {
        let decodedUserDetails;
        if(!accessToken && !refreshToken) {
            throw new UnAuthorizedException();
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                if(!refreshToken) {
                    throw new UnAuthorizedException();
                }
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                    if(err) {
                        throw new UnAuthorizedException();
                    }
                    const accessToken = createToken(decoded, TokenType.ACCESS);
                    response.cookie("accessToken", accessToken , {
                        httpOnly: true,
                        secure: false, // Use 'secure' in production for HTTPS
                        sameSite: 'Strict',
                        maxAge: 10 * 60 * 1000, // 10 minutes
                    });
                })
                decodedUserDetails = decoded;
            }
            decodedUserDetails = decoded;
            response.status(200).json({isAuthenticated: true, decodedUserDetails});
        })
    }
    catch(err) {
        //send error response
        return res.status(401).json({ isAuthenticated: false });
    }  
  }

export const resetPasswordRequestController = async (req, res, next) => {
    try {
       if(!req.body.email) return res.status(400).json({message: 'email is required'});
    await userService.requestPasswordReset(
      req.body.email
    );
    return res.status(200).json({message: 'succesfully sent the link!'});

    } catch(err) {
    return res.status(500).json({message: 'something went worng!'});
    }
  };


  export const resetPasswordController = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const  { activation_token }= req.query;
        if(!email || !password || !activation_token) {
            return res.status(400).json({message: 'email / password / token are required'});
        }
        const tokenDetails = await tokenService.findToken({token: activation_token});
        if(!tokenDetails) {
            return res.status(400).json({message: 'token expired or not found!'});
        }
    await userService.resetPassword(
      req.body.email,
      tokenDetails.token,
      req.body.password
    );
    return res.status(200).json({message: 'succesfully password is reset!'});
    } catch(err) {
        console.error(err.message);
        return res.status(err.status ? err.status : 500).json(
            {message: err.message ? err.message : 'something went wrong!'});
    }
  };
  

  export const logout = async (request, response) => {
    //extract email id from request body
    let {email} = request.body;
    try {
        //fetch the user details from DB using the email id
        const user = await userService.findUserByEmail(email);
        if(!user.isValid) {
            throw new UnverifiedEmailException();
        }
            let refreshToken = await tokenService.deleteToken({ email });
            const result = {
                _id: user._id,
                email: user.email,
                role: user.role
            }
            //setting the refreshToken cookie and user details in response
            setHttpOnlyCookiesAndResponse({
                ...result,
                message: "You have successfully logged out"
            },
            [
                {
                    name: "refreshToken",
                    value: refreshToken,
                    options: {
                        httpOnly: true,
                        secure: false, // Use 'secure' in production for HTTPS
                        sameSite: 'Strict',
                        maxAge: 0  
                    }
                },
                {
                    name: "accessToken",
                    value: "",
                    options: {
                        httpOnly: true,
                        secure: false, // Use 'secure' in production for HTTPS
                        sameSite: 'Strict',
                        maxAge: 0  
                    }
                }
            ],
            response
            )

            
        }
    catch(err) {
        //return error response
        setErrorResponse(err,response);
    }
  };