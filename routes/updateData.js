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


// Deleting items

router.delete('/removeInstitution', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM institution WHERE "idInstitution" = '${id}'`).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(403).json(err);
    })
  })
})

router.delete('/removeEmployee', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM employee WHERE "idEmployee" = '${id}'`).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(403).json(err);
    })
  })
})

router.delete('/removeProgram', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM programs WHERE "idProgram" = '${id}'`).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(403).json(err);
    })
  })
})

router.delete('/removeEvent', verify, (req,res,next) => {
  const { id } = req.query;
  pool.connect().then((client) => {
    client.query(`DELETE FROM "programEvent" WHERE "idEvent" = '${id}'`).then(response => {
      res.status(200).json(response);
    }).catch(err => {
      console.log(err);
      res.status(403).json(err);
    })
  })
})

module.exports = router;
