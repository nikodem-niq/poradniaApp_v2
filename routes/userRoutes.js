const express = require('express');
const router = express.Router();
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
require('dotenv').config();

const pool = new pg.Pool({
    connectionString: process.env.PGURI,
    ssl: {
      rejectUnauthorized: false
    }
  });


  // User auth and register
router.post('/register', async (req,res,next) => {
    const { login, password }= req.body;
    pool.connect().then(client => {
        client.query(`SELECT 'login' FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
            client.release();
            if(!response.rowCount < 1) {
                res.status(config.loginOrEmailExists.code).json(config.loginOrEmailExists.message)
            } else {
                // Hash passwords
                bcrypt.genSalt(10, (err,salt) => {
                    if(!err) {
                        bcrypt.hash(password, salt, (err, hashed) => {
                            if(err) {
                                res.status(400).send('err with hash');
                                // client.release();
                            } else {
                                // Insert user into db
                                client.query(`INSERT INTO users(login, password, "dateCreated") VALUES('${login}', '${hashed}', 'NOW()')`, (err, response) => {
                                    // client.release();
                                    const token = jwt.sign({ login }, process.env.SECRET_JWT, { expiresIn: '6h' });
                                    res.status(config.registered.code).json({message: config.registered.message, token})
                                })
                            }
                        })
                    }
                })
            }
        }).catch(err => {
            client.release();
        })
    });

    // Check if user with { login } exists.

})

router.post('/auth', (req,res,next) => {
    const { login, password } = req.body;

    pool.connect().then(client => {
        client.query(`SELECT 'login','password' FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
            client.release();
            if(!response.rowCount > 0) {
                res.status(config.badLoginOrPassword.code).json(config.badLoginOrPassword.message);
            } else {
                client.query(`SELECT * FROM "users" WHERE "login" LIKE '${login}'`).then(response => {
                    // client.release();
                    let encryptedPassword = response.rows[0].password;
                    bcrypt.compare(password, encryptedPassword, (err, same) => {
                        if(same) {
                            const token = jwt.sign({ login }, process.env.SECRET_JWT, { expiresIn: '3h' });
                            res.status(200).send({msg : `user ${login} logged in`, token})
                        } else {
                            res.status(401).send({msg : 'bad password'})
                        }
                    })
                }).catch(err => {
                    client.release();
                    console.log(err);
                })
            }
        });
    }).catch(err => {
        client.release();
        console.log(err);
    });

})

module.exports = router;
