import * as reviewController from '../controller/contReview.js'
import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { validateReview, isReviewAuthor } from '../middleware/validation.js'
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const routerReview = express.Router({ mergeParams: true });

routerReview.post('/', isLoggedIn, validateReview, catchAsync(reviewController.addReview))
routerReview.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewController.removeReview))

export default routerReview;