const express = require('express');
const router = express.Router();
const pg = require('pg');
require('dotenv').config();


router.get('/db', (req,res,next) => {
    const client = new pg.Client({
        connectionString: process.env.PGURI,
        ssl: {
          rejectUnauthorized: false
        }
      });

    client.connect();
})

module.exports = router;
