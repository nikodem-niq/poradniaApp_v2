const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();
const pg = require('pg');
const { verify } = require('jsonwebtoken');
require('dotenv').config();

const pool = new pg.Pool({
  connectionString: process.env.PGURI,
  ssl: {
    rejectUnauthorized: false
  }
});


// Update data

router.put('/institution-edit', verify, (req,res,next) => {
  const { nameOfInstitution, email, city, community, postalCode, address, telephone, fax } = req.body;
  pool.connect().then(client => {
    let query;
    if(nameOfInstitution) {
      query = `UPDATE institution SET name = '${nameOfInstitution}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(email) {
      query = `UPDATE institution SET email = '${email}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(city) {
      query = `UPDATE institution SET city = '${city}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(community) {
      query = `UPDATE institution SET community = '${community}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(postalCode) {
      query = `UPDATE institution SET "postalCode" = '${postalCode}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(address) {
      query = `UPDATE institution SET address = '${address}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(telephone) {
      query = `UPDATE institution SET telephone = '${telephone}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    if(fax) {
      query = `UPDATE institution SET fax = '${fax}' WHERE "idInstitution" = ${req.query.id}`
      console.log(query)
    }
    client.query(query).then(response => {
      client.release();
      res.status(200).json(response);
    })
  })
})

// Deleting items

router.delete('/removeInstitution', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM institution WHERE "idInstitution" = '${id}'`).then(response => {
      client.release();
      res.status(200).json(response);
    }).catch(err => {
      client.release();
      console.log(err);
      res.status(403).json(err);
    })
  })
})

router.delete('/removeEmployee', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM employee WHERE "idEmployee" = '${id}'`).then(response => {
      client.release();
      res.status(200).json(response);
    }).catch(err => {
      client.release();
      console.log(err);
      res.status(403).json(err);
    })
  })
})

router.delete('/removeProgram', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM programs WHERE "idProgram" = '${id}'`).then(response => {
      client.release();
      res.status(200).json(response);
    }).catch(err => {
      client.release();
      console.log(err);
      res.status(403).json(err);
    })
  })
})

router.delete('/removeEvent', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM "programEvent" WHERE "idEvent" = '${id}'`).then(response => {
      client.release();
      res.status(200).json(response);
    }).catch(err => {
      client.release();
      console.log(err);
      res.status(403).json(err);
    })
  })
})

module.exports = router;
