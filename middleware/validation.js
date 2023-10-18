
import ExpressError from '../utils/ExpressError.js';
import { campgroundSchema } from '../Joischema.js';
import { reviewSchema } from '../Joischema.js';

// if(!req.body.campground) throw new ExpressError('invalid campground data', 400)

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        console.log('a7a');
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(`that's error coming from the review validation`);
        throw new ExpressError(msg, 400)
    } else {
        console.log('a7a');
        next();
    }
}

export {
    validateCampground,
    validateReview

}