import 'dotenv/config';
if(process.env.NODE_ENV !== "production"){
    import('dotenv').then(() => {
        console.log('env file has been loaded');
    })
}

import path from 'path';
import { fileURLToPath } from 'url';
import connection from './DB/config.js';
import routerCamp from './routes/routeCamp.js'
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate'
import ExpressError from './utils/ExpressError.js'
import express from 'express'
import routerReview from './routes/routeReview.js'
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import localSteategy from 'passport-local';
import User from './model/user.js'
import routerUser from './routes/routeUser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expirse: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localSteategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connection();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', routerUser);
app.use('/campgrounds', routerCamp);
app.use('/campgrounds/:id/reviews', routerReview);

app.use(express.static(path.join(__dirname, 'public')));



// const sessionConfig = {
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }




app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'oh no, Somthing went wrong'
    }
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})
