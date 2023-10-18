import mongoose from 'mongoose';
import Review from './review.js';
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // the realationship here is a parent to child relation
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

// mongoose middleware for deleting campground reviews when delete a whole camground 
campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
            
        })
        console.log('should be deleted');
    }
})

export default mongoose.model('Campground', campgroundSchema);
