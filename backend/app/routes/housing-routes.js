//mport Express for creating the router and housingController for handling housing-related requests.
import express from "express";
import * as housingController from '../controllers/housing-controller.js';

//Create an Express router for housing-related routes.
const router = express.Router();

//Define a route for handling GET requests to fetch housing data.
router.route('/')
    .get(housingController.getHousing)

//Export the housing router for use in the main application.    
export default router;