import * as reviewController from '../controller/contReview.js'
import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { validateReview } from '../middleware/validation.js'
const routerReview = express.Router({ mergeParams: true });

routerReview.post('/', validateReview, catchAsync(reviewController.addReview))
routerReview.delete('/:reviewId', catchAsync(reviewController.removeReview))

export default routerReview;