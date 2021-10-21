const express = require('express');
const router = express.Router();
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = new pg.Pool({
    connectionString: process.env.PGURI,
    ssl: {
      rejectUnauthorized: false
    }
  });


  // User auth and register
router.post('/register', (req,res,next) => {
    const { login, password }= req.body;
    pool.connect();

    // Check if user with { login } exists.

    pool.query(`SELECT 'login' FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
        if(!response.rowCount < 1) {
            res.send('user with this login exists');
        } else {
            // Hash passwords
            bcrypt.genSalt(10, (err,salt) => {
                if(!err) {
                    bcrypt.hash(password, salt, (err, hashed) => {
                        if(err) {
                            res.status(400).send('err with hash');
                        } else {
                            console.log(login, hashed)
                            // Insert user into db
                            pool.query(`INSERT INTO users(login, password, "dateCreated") VALUES('${login}', '${hashed}', 'NOW()')`, (err, response) => {
                                pool.end();
                                const token = jwt.sign({ login }, process.env.SECRET_JWT, { expiresIn: '6h' });
                                res.status(200).send(response.rowCount+ ' token: ' +token);
                            })
                        }
                    })
                }
            })
        }
    })
})

router.post('/auth', (req,res,next) => {
    const { login, password } = req.body;
    pool.connect();

    pool.query(`SELECT 'login','password' FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
        if(!response.rowCount > 0) {
            res.status(404).send({err : 'user with that login doesn\'t exists'})
        } else {
            pool.query(`SELECT * FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
                let encryptedPassword = response.rows[0].password;
                bcrypt.compare(password, encryptedPassword, (err, same) => {
                    if(same) {
                        pool.end();
                        const token = jwt.sign({ login }, process.env.SECRET_JWT, { expiresIn: '6h' });
                        res.status(200).send({msg : 'user logged in', token})
                    } else {
                        pool.end();
                        res.status(400).send({msg : 'bad password'})
                    }
                })
            })
        }
    });
})

module.exports = router;
