import mongoose from 'mongoose';

const connection = async () => {
    mongoose.set('strictQuery', true)
    await mongoose
        .connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true })
        .then(() => {
            console.log('congratulations, database connected');
        })
        .catch((err) => {
            console.log('something went wrong with the connection');
            console.log(err);
        })
}

export default connection;


