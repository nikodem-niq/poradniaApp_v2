const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const fetchDataRoutes = require('./routes/fetchData');
app.use('/fetchData', fetchDataRoutes)

const postDataRoutes = require('./routes/postData');
app.use('/postData', postDataRoutes)

const updateDataRoutes = require('./routes/updateData');
app.use('/updateData', updateDataRoutes)

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes)

module.exports = app;