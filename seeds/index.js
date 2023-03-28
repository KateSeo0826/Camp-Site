const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6387b2108fb9a1efd9e71f25',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, nulla. Quaerat corrupti consectetur, accusamus quasi omnis pariatur eos similique, aspernatur eveniet voluptate alias modi dignissimos natus error perferendis nam doloremque.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/dnf7mdcw6/image/upload/v1670263257/YelpCamp/feal0vmcwfin9dsxa6rq.jpg',
                filename: 'YelpCamp/feal0vmcwfin9dsxa6rq',
            },
            {
                url: 'https://res.cloudinary.com/dnf7mdcw6/image/upload/v1670263257/YelpCamp/jwgzimctvgqkcwdrlzdg.jpg',
                filename: 'YelpCamp/jwgzimctvgqkcwdrlzdg',
            }
            ],
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})