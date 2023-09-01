require("dotenv").config();
const express = require("express");
const cors = require("cors");
const signupRouter = require("./routes/signup");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", signupRouter);

app.listen(process.env.port || 3000, () =>
    console.log("Listening for requests...")
);
