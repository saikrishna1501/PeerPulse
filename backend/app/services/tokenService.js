import ExpiredInvalidTokenException from "../exceptions/expired-invalid-token-exception.js";
import UserToken from "../models/tokenModel.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const TokenType = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    VERIFY: 'verify'
};

export const findToken = async(filter) => {
    console.log(filter);
    let tokenDetails = await UserToken.findOne(filter);
    console.log(tokenDetails);
    if(tokenDetails) {
        return tokenDetails;
    }
    else {
        throw new ExpiredInvalidTokenException();
    }
}

export const saveToken = async(email,token) => {
    try {
    const tokenDetails = await deleteToken({email});
    const newTokenDetails = new UserToken({email,token});
    return newTokenDetails.save();
    }
    catch(err) {
        console.log(err);
    }
}

export const createToken = async(user, tokenType)=>{
    let expiresIn;
    let secret;
    let token;
    if(tokenType === TokenType.ACCESS || tokenType === TokenType.REFRESH) {
        if(tokenType === TokenType.ACCESS) {
            expiresIn = "10m"; //token expires in 10 minutes
            secret = process.env.ACCESS_TOKEN_SECRET;
        }
        else {
            expiresIn = "3d"; //token expires in 3 days
            secret = process.env.REFRESH_TOKEN_SECRET;
        }
        token = jwt.sign(
            {
                role: user.role,
                email: user.email,
                id: user._id
            },
            secret,
            {
                expiresIn: expiresIn
            }
        );
    }
    else {
        token = crypto.randomBytes(32).toString("hex");
    }
    if(tokenType === TokenType.REFRESH || tokenType === TokenType.VERIFY) {
        await saveToken(user.email, token);
    }

    return token;
}

export const deleteToken = async(filter) => {
    let tokenDetails = await UserToken.findOne(filter);
    if(tokenDetails) {
        return tokenDetails.deleteOne();
    }
    else {
        console.log("Token not found, so skipped delete");
    }
}

