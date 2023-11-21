import express from 'express';
import * as userController from '../controllers/users-controller.js'; 
import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

const router = express.Router();

router.route("/")
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT,Roles.MODERATOR]),userController.getUsers)
    .post(userController.saveUser)

router.route("/auth")
    .post(userController.login)

router.route("/:id")
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]),userController.findUserById)
    .put(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]),userController.updateUser)
    .delete(authorize, checkRoles([Roles.ADMIN]), userController.deleteUser);

export default router;