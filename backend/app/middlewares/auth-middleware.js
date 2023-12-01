//imports
import { setErrorResponse } from "../controllers/response-handler.js";
import UnAuthorizedException from "../exceptions/unauthorized-exception.js";
import jwt from 'jsonwebtoken';
import { createToken, TokenType } from "../services/tokenService.js";

//authorizer middleware to authenticate the incoming request
function old_authorize(request, response, next) {
    try {
        //extract the session cookie(http only cookie)
        const token = request.cookies.session;
        if(!token) {
            //if token is missing then throw UnAuthorizedException
            throw new UnAuthorizedException();
        }
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if(err) {
                //if token is invalid then throw UnAuthorizedException
                console.log(err);
                throw new UnAuthorizedException();
            }
            //add the decoded email to the request so that other middlewares or request handler can access it
            request.email = decoded.email;
            //pass the control to next middleware
            next();
        })
    }
    catch(err) {
        //send error response
        setErrorResponse(err, response);
    }
}

const lol = async(request, response, next) => {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;
    try {
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
                    //add the decoded email to the request so that other middlewares or request handler can access it
                    request.email = decoded.email;
                    //pass the control to next middleware
                    next();
                })
            }
            else {
                //add the decoded email to the request so that other middlewares or request handler can access it
                request.email = decoded.email;
                //pass the control to next middleware
                next();
            }
        })
    }
    catch(err) {
        //send error response
        console.log("executed");
        setErrorResponse(err, response);
    }  
}

const authorize = async(request, response, next) => {
    console.log(request.cookies);
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;
    try {
        if(!accessToken && !refreshToken) {
            throw new UnAuthorizedException();
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            //add the decoded email to the request so that other middlewares or request handler can access it
            request.email = decoded.email;
            //pass the control to next middleware
            next();
        }
        catch(err) {
            if(!refreshToken) {
                throw new UnAuthorizedException();
            }
            try {
                console.log("refreshToken", refreshToken);
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const accessToken = createToken(decoded, TokenType.ACCESS);
                response.cookie("accessToken", accessToken , {
                    httpOnly: true,
                    secure: false, // Use 'secure' in production for HTTPS
                    sameSite: 'Strict',
                    maxAge: 10 * 60 * 1000, // 10 minutes
                });
                //add the decoded email to the request so that other middlewares or request handler can access it
                request.email = decoded.email;
                //pass the control to next middleware
                next();
            }
            catch(err) {
                throw new UnAuthorizedException();
            }
        }
    }
    catch(err) {
        //send error response
        setErrorResponse(err, response);
    }  
}


export default authorize;