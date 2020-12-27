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
app.use('/adauth',require('./routes/adauth'));

app.listen(process.env.PORT || config.get("PORT"),() => {
    console.log(`server is running on port ${process.env.PORT || config.get("PORT")}`);
})