import express from "express";
import * as housingController from '../controllers/housing-controller.js';

const router = express.Router();

router.route('/')
    .get(housingController.getHousing)

export default router;