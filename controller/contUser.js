import User from '../model/user.js'

export const registerForm = async (req, res, next) => {
    res.render('users/register');
}

export const register = async (req, res, next) => {
    try {
        const { email, username, password, cPassword } = req.body;
        if (password !== cPassword) {
            req.flash('error', 'Passwords does not match');
            return res.redirect('register');
        }

        const user = new User({ email, username });
        const registerUser = await User.register(user, password);

        req.login(registerUser, err => {
            if (err) {
                req.flash('error', 'Error during login');
                return res.redirect('register');
            }
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('register');
    }
};



export const loginForm = async (req, res, next) => {
    res.render('users/login');
}

export const login = async (req, res, next) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl)
}

export const logout = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
};