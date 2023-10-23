
import ExpressError from '../utils/ExpressError.js';
import { campgroundSchema } from '../Joischema.js';
import { reviewSchema } from '../Joischema.js';
import Campground from '../model/campground.js';
import Review from '../model/review.js'

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

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', `you don't have permission to do that!`)
        res.redirect(`/campgrounds/${id}`)
    }
    next();
}


const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', `you don't have permission to do that!`)
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

export {
    validateCampground,
    validateReview,
    isAuthor,
    isReviewAuthor
}