const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const { urlencoded } = require('express');


const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))



const validateReview = (req, res, next) =>{
    const {error} = reviewSchema.validate(req.body);   
    if(error){
       const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next(); 
    }
}

app.get('/', (req, res) => {
    res.redirect('/campgrounds')
});



app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)



app.all('*' ,(req, res, next) => {
    next(new ExpressError('page not found', 404))
})


app.use((err, req, res, next) => {
    const {statusCode = 500 } = err;
        if(!err.message) err.message = 'Oh NO, Something Went Wrong!'
    res.status(statusCode).render('Error', {err});    
}) 


app.listen(3000, () => {
    console.log('Serving on port 3000');
})
