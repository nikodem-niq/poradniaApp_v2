const express = require('express');
const app = express();

const fetchDataRoutes = require('./routes/fetchData');
app.use('/fetchData', fetchDataRoutes)

const postDataRoutes = require('./routes/postData');
app.use('/postData', postDataRoutes)

const updateDataRoutes = require('./routes/updateData');
app.use('/updateData', updateDataRoutes)

module.exports = app;