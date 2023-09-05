const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Checks if there is an error in the Database connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({}); //deletes data at first, iterates 50 times, picks city and state along with a descriptor and a place
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000); //1000 cities in our array of data
        const camp= new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`, //pulls a random city and state from list of 1000
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();  //save this new data into db
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});