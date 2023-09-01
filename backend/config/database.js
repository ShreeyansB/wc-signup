const { default: mongoose } = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log(`Connected to MongoDB at ${DATABASE_URL}`);
});

db.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

db.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});

module.exports = mongoose;
