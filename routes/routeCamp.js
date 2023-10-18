import { validateCampground } from '../middleware/validation.js'
import * as contCamp from '../controller/contCamp.js'
import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const routerCamp = express.Router();

routerCamp.get('/', catchAsync(contCamp.getCampgrounds));
routerCamp.get('/new', isLoggedIn, catchAsync(contCamp.newCampgroundForm));
routerCamp.get('/:id', catchAsync(contCamp.getCampgroundById));
routerCamp.post('/', isLoggedIn, validateCampground, catchAsync(contCamp.addCampground));
routerCamp.get('/:id/edit', isLoggedIn, catchAsync(contCamp.editCampgroundFrom))
routerCamp.put('/:id', isLoggedIn, validateCampground, catchAsync(contCamp.editCampground));
routerCamp.delete('/:id', isLoggedIn, catchAsync(contCamp.deleteCampground));



export default routerCamp;