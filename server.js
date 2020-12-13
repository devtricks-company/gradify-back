const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const DBConnecting = require('./config/db');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

DBConnecting();

app.use('/student',require('./routes/student'));
app.use('/admin',require('./routes/admin'));

app.listen(config.get("PORT"),() => {
    console.log('server is running on port 4000');
})