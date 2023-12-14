//imports
import express from 'express';
import * as userController from '../controllers/users-controller.js'; 
import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

//create express router
const router = express.Router();

//get requires authentication but creating a user doesn't require authentication(sign up)
router.route("/")
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),userController.getUsers)
    .post(userController.register)

router.route("/pages")
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),userController.getNoOfPages)
//login route(no authentication required)
router.route("/auth")
    .post(userController.login)

//Forgot password 
router.route("/auth/requestResetPassword")
    .post(userController.resetPasswordRequestController)

//reset password
router.route("/auth/resetPassword")
    .post(userController.resetPasswordController)

//signup route
router.route("/register")
    .post(userController.register)

//verification link
router.route("/activate/:activation_token")
      .get(userController.verifyEmail)

//to verify the 'session' cookie and respond
router.route("/auth-check")
        .get(userController.validateCookie)

//fetch, update and delete routes for a particular user
router.route("/:id")
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),userController.findUserById)
    .put(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT]),userController.updateUser)
    .delete(authorize, checkRoles([Roles.ADMIN]), userController.deleteUser);

router.route("/logout")
    .post(userController.logout)

//export users router
export default router;