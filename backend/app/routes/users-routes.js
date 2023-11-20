import express from 'express';
import * as userController from '../controllers/users-controller.js'; 

const router = express.Router();

router.route("/")
    .get(userController.getUsers)
    .post(userController.saveUser)

router.route("/:id")
    .get(userController.findUserById)
    .put(userController.updateUser)

export default router;