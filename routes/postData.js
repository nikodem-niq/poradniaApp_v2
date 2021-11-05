const e = require('express');
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

router.post('/search', verifyToken, async (req,res,next) => {
  const client = await pool.connect()
  // Querying 
  const { firstDate, secondDate, employees, nameOfInstitution, nameOfProgram, typeOfProgram, firstParticipiants, secondParticipiants, firstPrograms, secondPrograms, differentNameProgram } = req.body;
  let query = `SELECT * FROM "programEvent" WHERE "idEvent" IS NOT NULL `

  const checkInstitutions = async () => {
    let institutionId = [];
    if(nameOfInstitution) {
      const institutionQuery = await client.query(`SELECT "idInstitution" FROM "institution" WHERE LOWER(name) LIKE LOWER('%${nameOfInstitution}%')`);
        if(institutionQuery.rowCount > 0) {
          for(let i=0; i<institutionQuery.rowCount; i++) {
            institutionId.push(institutionQuery.rows[i].idInstitution)
            }
            if(institutionId.length > 0) {
              return institutionId
            } else { 
              return false;
            }
          }
          // client.release();
    }
  }

  const checkPrograms = async () => {
    let programsId = [];
    if(nameOfProgram) {
      const programQuery = await client.query(`SELECT "idProgram" FROM "programs" WHERE LOWER(name) LIKE LOWER('%${nameOfProgram}%')`);
        if(programQuery.rowCount > 0) {
          for(let i=0; i<programQuery.rowCount; i++) {
            programsId.push(programQuery.rows[i].idProgram)
            }
            if(programsId.length > 0) {
              return programsId
            } else { 
              return false;
            }
          }
          // client.release();
    }
  }
    // General Query
    if(firstDate && secondDate) {
      query += `AND "dateOfEvent" >= '${firstDate}' AND "dateOfEvent" <= '${secondDate}' `
    }

    if(employees) {
      query += `AND LOWER(employees) LIKE LOWER('%${employees}%') `
    }

    if(checkInstitutions()) {
      let institutions = await checkInstitutions();
      if(institutions) {
        query += `AND ( `
        for(let i=0; i<institutions.length; i++) {
          query += `${institutions.length > 1 && i != 0 ? 'OR ' : ''}"institutionId" = ${institutions[i]} `
        }
        query += `)`
      } 
    }

    if(checkPrograms()) {
      let programs = await checkPrograms();
      if(programs) {
        query += `AND ( `
        for(let i=0; i<programs.length; i++) {
          query += `${programs.length > 1 && i != 0 ? 'OR ' : ''}"programId" = ${programs[i]} )`
        }
      } 
    }

    if(typeOfProgram) {
      query += `AND LOWER("typeOfProgram") LIKE LOWER('%${typeOfProgram}%') `
    }

    if(firstParticipiants && secondParticipiants) {
      query += `AND "howManyParticipiants" >= ${firstParticipiants} AND "howManyParticipiants" <= ${secondParticipiants} `
    }

    if(firstPrograms && secondPrograms) {
      query += `AND "howManyPrograms" >= ${firstPrograms} AND "howManyPrograms" <= ${secondPrograms} `
    }

    if(differentNameProgram) {
      query += `AND LOWER("differentNameProgram") LIKE LOWER('%${differentNameProgram}%') `
    }

    // console.log(query);
    const finalQuery = await client.query(query);
    res.status(200).json(finalQuery.rows);

    client.release();
})

module.exports = router;
