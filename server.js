const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const cors = require('cors');
require('dotenv/config');

// security
const helmet = require('helmet');
const xssCleaner = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');


// mid
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(xssCleaner());
app.use(mongoSanitize());
app.use(hpp());


app.get("/", (req, res) => {
  res.status(200).json({
    msg: "this is Saraj File shop course server......"
  });
});



const MiddleBannerRoutes = require("./routes/middleBannerRoutes");
const postRoutes = require("./routes/postRoutes");
const mainsliderRoutes = require("./routes/mainSliderRoutes");

app.use("/api",MiddleBannerRoutes);
app.use("/api",postRoutes);
app.use("/api",mainsliderRoutes);


const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;


const uri =
    "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL)
  .then(d => {
    console.log("ok");
    app.listen(PORT);
  })
  .catch(err => console.log(err));

