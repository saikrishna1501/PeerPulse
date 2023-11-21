//mport Express for creating the router and housingController for handling housing-related requests.
import express from "express";
import * as housingController from '../controllers/housing-controller.js';
import authorize from '../middlewares/auth-middleware.js';
import checkRoles from '../middlewares/check-roles-middleware.js';
import { Roles } from '../models/users-model.js';

//Create an Express router for housing-related routes.
const router = express.Router();

//Define a route for handling GET requests to fetch housing data.
router.route('/')
    .get(authorize, checkRoles([Roles.ADMIN, Roles.STUDENT, Roles.MODERATOR]),housingController.getHousing)

//Export the housing router for use in the main application.    
export default router;