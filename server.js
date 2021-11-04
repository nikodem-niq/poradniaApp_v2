const app = require('./app');
require('dotenv').config();

/* 
    Starting server on env PORT.
*/

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on: ${port}`);
})

