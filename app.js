const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
  });

const fetchDataRoutes = require('./routes/fetchData');
app.use('/fetchData', fetchDataRoutes)

const postDataRoutes = require('./routes/postData');
app.use('/postData', postDataRoutes)

const updateDataRoutes = require('./routes/updateData');
app.use('/updateData', updateDataRoutes)

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;