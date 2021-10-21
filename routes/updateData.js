const express = require('express');
const router = express.Router();
const pg = require('pg');
require('dotenv').config();

const client = new pg.Client({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get('/test', (req,res,next) => {
  res.send('test');
})

module.exports = router;
