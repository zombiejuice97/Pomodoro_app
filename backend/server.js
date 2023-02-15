const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require("../backend/routes/todoRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config({ path: '../.env' }); // Here you must take care to provide the correct path of the .env file

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(todoRoutes);

mongoose
.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
.then(()=>{
    app.listen(5000,function(){
        console.log("server running on port 5000!");
    })
    
})
.catch((err)=>{console.log(err);});



