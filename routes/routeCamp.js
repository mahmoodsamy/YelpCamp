import { isAuthor, validateCampground } from '../middleware/validation.js'
import * as contCamp from '../controller/contCamp.js'
import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const routerCamp = express.Router();

routerCamp.route('/')
    .get(catchAsync(contCamp.getCampgrounds))
    .post(isLoggedIn, validateCampground, catchAsync(contCamp.addCampground))

routerCamp.get('/new', isLoggedIn, catchAsync(contCamp.newCampgroundForm));
routerCamp.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(contCamp.editCampgroundForm))

routerCamp.route('/:id')
    .get(catchAsync(contCamp.getCampgroundById))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(contCamp.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(contCamp.deleteCampground))

// routerCamp.get('/', catchAsync(contCamp.getCampgrounds));
// routerCamp.get('/:id', catchAsync(contCamp.getCampgroundById));
// routerCamp.post('/', isLoggedIn, validateCampground, catchAsync(contCamp.addCampground));
// routerCamp.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(contCamp.editCampground));
// routerCamp.delete('/:id', isLoggedIn, isAuthor, catchAsync(contCamp.deleteCampground));



export default routerCamp;