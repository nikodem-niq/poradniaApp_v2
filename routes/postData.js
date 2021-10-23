const express = require('express');
const router = express.Router();
const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false
  }
});

router.post('/institution-add', (req,res,next) => {
  const { nameOfInstitution, email, city, community, postalCode, address, telephone, fax } = req.body;
  if(!(nameOfInstitution && email && city && community && postalCode && address && telephone && fax)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      client.query(`INSERT INTO institution(name, email, city, community, "postalCode", address, telephone, fax) VALUES('${nameOfInstitution}', '${email}', '${city}', '${community}', '${postalCode}', '${address}',
      '${telephone}', '${fax}')`, (err, response) => {
        client.release();
        res.status(200).json(response.rowCount);
      });
    })
  }
})

module.exports = router;
