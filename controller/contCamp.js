import Campground from '../model/campground.js';
// import expressFlash from 'express-flash.js';

export const getCampgrounds = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });

}

export const newCampgroundForm = async (req, res) => {

    res.render('campgrounds/new');
}


// // Define a route handler that sets a flash message and redirects to another page
// app.get('/login', (req, res) => {
//     req.flash('success', 'You have successfully logged in');
//     res.redirect('/messages');
// });

// // Define a route handler that displays the flash message
// app.get('/messages', (req, res) => {
//     const successMessage = req.flash('success');
//     res.render('messages', { successMessage });
// });

export const addCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground')
    console.log('success from addCampground');
    res.redirect(`/campgrounds/${campground._id}`);
}


export const getCampgroundById = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    console.log(campground);
    if (!campground) {
        req.flash('error', 'Cannot find that camoground')
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}

export const editCampgroundFrom = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that camoground')
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

export const editCampground = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`);

}


export const deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}