const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require("dotenv")
const app = express();



app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
dotenv.config();

//Routes
const reviewsRoute = require("./api/v1/routes/reviews");
const businessRoute = require("./api/v1/routes/business");
const accountsRoute = require("./api/v1/routes/accounts");

//Connect to mongoDB
mongoose.connect("mongodb+srv://Reviews:"+process.env.USER_DB_PASS+"@users.6h2lh.mongodb.net/developmentDB?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true
},()=>{
    console.log("Connected to database");
});

app.use('/api/v1/reviews', reviewsRoute);
app.use('/api/v1/business', businessRoute);
app.use('/api/v1/accounts',accountsRoute);


app.use('*',(req,res)=>{
    res.status(404).json({
        error: "Error Occured"
    });
});


module.exports= app;


