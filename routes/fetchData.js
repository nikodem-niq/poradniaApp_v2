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

router.get('/institution-get', verifyToken, (req,res,next) => {
  pool.connect().then(client => {
        // Fetch all  
        let query;
        if(req.query.id) {
          query = `SELECT * FROM institution WHERE "idInstitution" = ${req.query.id}`;
        } else {
          query = `SELECT * FROM institution`;
        }
    
        client.query(query, (err,response) => {
          client.release();
          if(err) {
            console.log(err)
            res.status(403).json(err)
          } else {
            res.status(200).json(response);
          }
        })

    })
})

router.get('/employee-get', verifyToken, (req,res,next) => {
  pool.connect().then(client => {
    const { column, order, limit } = req.query;
    if(column || order || limit) {
      let query = `SELECT * FROM employee ORDER BY "${column}" ${order || 'ASC'} LIMIT ${limit || 'ALL'}`;
      client.query(query).then(response => {
        client.release();
        res.status(200).send(response);
      }).catch(err => {
        client.release();
        console.log(err);
      })
    } else {
      // Fetch all  
      const query = `SELECT * FROM employee;`
  
      client.query(query, (err,response) => {
        client.release();
        if(err) {
          console.log(err)
          res.status(403).json(err)
        } else {
          res.status(200).json(response);
        }
      })
    }
  })
})

router.get('/programs-get', verifyToken, (req,res,next) => {
  pool.connect().then(client => {
    const query = `SELECT * FROM programs;`

    client.query(query, (err,response) => {
      client.release();
      if(err) {
        console.log(err)
        res.status(403).json(err)
      } else {
        res.status(200).json(response);
      }
    })
  })
})

router.get('/events-get', verifyToken, (req,res,next) => {
  pool.connect().then(client => {
    const query = `SELECT * FROM "programEvent";`

    client.query(query, (err,response) => {
      client.release();
      if(err) {
        console.log(err)
        res.status(403).json(err)
      } else {
        res.status(200).json(response);
      }
    })
  })
})

module.exports = router;
