const express = require('express');
const router = express.Router();
const pg = require('pg');
const { verifyToken } = require('../middlewares/auth');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false
  }
});

router.post('/institution-add', verifyToken, (req,res,next) => {
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

router.post('/employee-add', verifyToken, (req,res,next) => {
  const { firstName, secondName, lastName, age } = req.body;
  if(!(firstName && lastName && age)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO employee("firstName", "secondName", "lastName", age) VALUES('${firstName}', '${secondName}', '${lastName}', ${age})`

      client.query(query, (err, response) => {
        client.release();
        if(err) {
          console.log(err);
          res.json(err);
        } else {
          res.status(200).json(response);
        }
      });
    })
  }
})

router.post('/program-add', verifyToken, (req,res,next) => {
  const { name, isLocal, forWho, classes } = req.body;
  if(!(name)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO programs(name, "isLocal", "forWho", "classes") VALUES('${name}', ${isLocal}, ${forWho}, '${classes}')`

      client.query(query, (err, response) => {
        client.release();
        if(err) {
          console.log(err);
          res.json(err);
        } else {
          res.status(200).json(response);
        }
      });
    })
  }
})

router.post('/event-add', verifyToken, (req,res,next) => {
  const { dateOfEvent, employees, institutionId, programId, typeOfProgram, howManyParticipiants, howManyPrograms, differentNameProgram } = req.body;
  if(!(dateOfEvent)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO "programEvent"("dateOfEvent", "employees", "institutionId", "programId", "typeOfProgram", "howManyParticipiants", "howManyPrograms", "differentNameProgram") VALUES('${dateOfEvent}', '${employees}', ${institutionId}, ${programId}, '${typeOfProgram}', ${howManyParticipiants}, ${howManyPrograms}, '${differentNameProgram}')`

      client.query(query, (err, response) => {
        client.release();
        if(err) {
          console.log(err);
          res.json(err);
        } else {
          res.status(200).json(response);
        }
      });
    })
  }
})

module.exports = router;
