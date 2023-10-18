// import mongoose from 'mongoose';
import Campground from '../model/campground.js'
import connection from '../DB/config.js';
import sities from './cities.js'
import { places, descriptors } from './seedHelpers.js';
import mongoose from 'mongoose';

connection();

const sample = array => array[Math.floor(Math.random() * array.length)]; // that fanction take a prameter to pick a random element 

const seedDB = async () => {
    await Campground.deleteMany({}); // delete all campgrounds to 
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000) // 50 times picking a random city and states into the location
        const price = Math.floor(Math.random() * 25) + 10;
        const camp = new Campground({
            author: '651085e671f5423db7687ee5',
            location: `${sities[random1000].city}, ${sities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}` // you pick to aragument in it to pick a random descriptors  and place from seedHelpers
            , image: 'https://source.unsplash.com/collection/483251',
            description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Praesentium molestias nemo tempora optio voluptatum magnam eveniet illum quia, 
            harum minus nisi reprehenderit temporibus ipsa aliquid ab ea nostrum alias? Repellat`
            , price
        })
        await camp.save(); // and finally we save
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})  