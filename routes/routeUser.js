import express from 'express';
import * as contUser from '../controller/contUser.js'
import catchAsync from '../utils/catchAsync.js'
import passport from 'passport';
import { storeReturnTo } from '../middleware/isLoggedIn.js'
const routerUser = express.Router();

routerUser.route('/register')
    .get(catchAsync(contUser.registerForm))
    .post(catchAsync(contUser.register))

routerUser.route('/login')
    .get(catchAsync(contUser.loginForm))
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(contUser.login))

routerUser.get('/logout', catchAsync(contUser.logout));



// routerUser.get('/register', catchAsync(contUser.registerForm))
// routerUser.post('/register', catchAsync(contUser.register))
// routerUser.get('/login', catchAsync(contUser.loginForm))
// routerUser.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(contUser.login));
// routerUser.get('/logout', catchAsync(contUser.logout));

export default routerUser;
