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

//DEMO DB
// const demoCredentials = {
//   user: "postgres",
//   host: "localhost",
//   database: "poradniademo",
//   password: "",
//   port: 5432,
// };

// const pool = new pg.Pool(demoCredentials)

router.post('/institution-add', verifyToken, (req,res,next) => {
  const { nameOfInstitution, email, city, community, postalCode, address, telephone, fax } = req.body;
  if(!(nameOfInstitution && email && city && community && postalCode && address && telephone)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      client.query(`INSERT INTO institution(name, email, city, community, "postalCode", address, telephone, fax) VALUES('${nameOfInstitution}', '${email}', '${city}', '${community}', '${postalCode}', '${address}',
      '${telephone}', '${fax}')`, (err, response) => {
        client.release();
        res.status(200).json(response);
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
  const { name, isLocal, typeOfProgram } = req.body;
  if(!(name)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO programs(name, "isLocal", "typeOfProgram") VALUES('${name}', ${isLocal}, '${typeOfProgram}')`

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
  const { dateOfEvent, employees, institutionId, programId, forWho, classes, howManyParticipiants, howManyPrograms, differentNameProgram } = req.body;
  if(!(dateOfEvent)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO "programEvent"("dateOfEvent", "employees", "institutionId", "programId", "forWho", "classes", "howManyParticipiants", "howManyPrograms", "differentNameProgram") VALUES('${dateOfEvent}', '${employees}', ${institutionId}, ${programId}, ${forWho}, '${classes}', ${howManyParticipiants}, ${howManyPrograms}, '${differentNameProgram}')`
      // console.log(query)
      client.query(query, (err, response) => {
        client.release();
        if(err) {
          console.log(err);
          res.status(400).json(err);
        } else {
          res.status(200).json(response);
        }
      });
    })
  }
})

router.post('/event-add-2022-2023', verifyToken, (req,res,next) => {
  const { dateOfEvent, employees, institutionId, programId, forWho, classes, howManyParticipiants, howManyPrograms, differentNameProgram } = req.body;
  if(!(dateOfEvent)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO "programEvent_22_23"("dateOfEvent", "employees", "institutionId", "programId", "forWho", "classes", "howManyParticipiants", "howManyPrograms", "differentNameProgram") VALUES('${dateOfEvent}', '${employees}', ${institutionId}, ${programId}, ${forWho}, '${classes}', ${howManyParticipiants}, ${howManyPrograms}, '${differentNameProgram}')`
      // console.log(query)
      client.query(query, (err, response) => {
        client.release();
        if(err) {
          console.log(err);
          res.status(400).json(err);
        } else {
          res.status(200).json(response);
        }
      });
    })
  }
})

router.post('/event-add-2023-2024', verifyToken, (req,res,next) => {
  const { dateOfEvent, employees, institutionId, programId, forWho, classes, howManyParticipiants, howManyPrograms, differentNameProgram } = req.body;
  if(!(dateOfEvent)) {
    res.status(403).json({message: "Invalid parameters"});
  } else {    
    pool.connect().then(client => {
      const query = `INSERT INTO "programEvent_23_24"("dateOfEvent", "employees", "institutionId", "programId", "forWho", "classes", "howManyParticipiants", "howManyPrograms", "differentNameProgram") VALUES('${dateOfEvent}', '${employees}', ${institutionId}, ${programId}, ${forWho}, '${classes}', ${howManyParticipiants}, ${howManyPrograms}, '${differentNameProgram}')`
      // console.log(query)
      client.query(query, (err, response) => {
        client.release();
        if(err) {
          console.log(err);
          res.status(400).json(err);
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
  const { firstDate, secondDate, employees, nameOfInstitution, community, nameOfProgram, typeOfProgram, firstParticipiants, secondParticipiants, firstPrograms, secondPrograms, differentNameProgram, classes } = req.body;
  let query = `SELECT * FROM "programEvent" WHERE "idEvent" IS NOT NULL `
  try {
    const checkInstitutionsName = async () => {
      let institutionId = [];
      if(nameOfInstitution) {
        const institutionQuery = await client.query(`SELECT "idInstitution" FROM "institution" WHERE LOWER(name) LIKE LOWER('%${nameOfInstitution}%')`);
        // client.release();
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
      }
    }
  
    const checkInstitutionsCommunity = async () => {
      let institutionId = [];
      // let query = 'SELECT "idInstitution" FROM "institution" WHERE "idInstitution" IS NOT NULL'
      if(community) {
        const institutionQuery = await client.query(`SELECT "idInstitution" FROM "institution" WHERE LOWER(community) LIKE LOWER('%${community}%')`);
        // client.release();
        if(institutionQuery.rowCount > 0) {
            for(let i=0; i<institutionQuery.rowCount; i++) {
              institutionId.push(institutionQuery.rows[i].idInstitution)
              }
              if(institutionId.length > 0) {
                return institutionId
              } else { 
                return false;
              }
            } else {
              return false;
            }
      }
    }
  
    const checkPrograms = async () => {
      let programsId = [];
      if(nameOfProgram) {
        const programQuery = await client.query(`SELECT "idProgram" FROM "programs" WHERE LOWER(name) LIKE LOWER('%${nameOfProgram}%')`);
        // client.release();
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
      }
    }

    const checkTypeOfProgram = async () => {
      let programsId = [];
      if(typeOfProgram) {
        const programQuery = await client.query(`SELECT "idProgram" FROM "programs" WHERE LOWER("typeOfProgram") LIKE LOWER('%${typeOfProgram}%')`);
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
      }
    }
  
    // const checkClasses = async () => {
    //   if(classes) {
    //     let indexOfClass = [];
    //     const reqClasses = classes.split(',');
    //     for(let i=0; i<reqClasses.length; i++) {
    //       if(reqClasses[i] == 'true') {
    //         indexOfClass.push(i);
    //       }
    //     }
  
    //     const programQuery = await client.query(`SELECT classes FROM "programEvent"`);
    //     let same = [];

    //     console.log(same);
  
    //     if(indexOfClass) {
    //       for(let j=0; j<programQuery.rowCount; j++) {
    //         for(let a=0; a<indexOfClass.length; a++) {
    //           if(programQuery.rows[j].classes.split(',')[indexOfClass[a]] == 'true') {
    //             if(!same.includes(programQuery.rows[j].idProgram)) {
    //               same.push(programQuery.rows[j].idProgram);
    //             }
    //           }
    //         }
    //       }
  
    //       return same;
    //     }
    //   }
    // }

      // General Query
      if(firstDate) {
        query += `AND "dateOfEvent" >= '${firstDate}' `
      }

      if(secondDate) {
        query += `AND "dateOfEvent" <= '${secondDate}' `
      }
  
      if(employees) {
        query += `AND LOWER(employees) LIKE LOWER('%${employees}%') `
      }
  
      if(checkInstitutionsName()) {
        let institutions = await checkInstitutionsName();
        if(institutions) {
          query += `AND ( `
          for(let i=0; i<institutions.length; i++) {
            query += `${institutions.length > 1 && i != 0 ? 'OR ' : ''}"institutionId" = ${institutions[i]} `
          }
          query += `)`
        } 
      }
  
      if(checkInstitutionsCommunity()) {
        let institutions = await checkInstitutionsCommunity();
  
        if(community && institutions) {
          query += ` AND ( `
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
            query += `${programs.length > 1 && i != 0 ? 'OR ' : ''}"programId" = ${programs[i]} `
          }
          query += `)`
        } 
      }

      if(typeOfProgram) {
        let programs = await checkTypeOfProgram();
        if(programs) {
          query += `AND ( `
          for(let i=0; i<programs.length; i++) {
            query += `${programs.length > 1 && i != 0 ? 'OR ' : ''}"programId" = ${programs[i]} `
          }
          query += `)`
        } 
      }
  
      if(firstParticipiants) {
        query += `AND "howManyParticipiants" >= ${firstParticipiants} `
      }

      if(secondParticipiants) {
        query += `AND "howManyParticipiants" <= ${secondParticipiants} `
      }
  
      if(firstPrograms) {
        query += `AND "howManyPrograms" >= ${firstPrograms} `
      }

      if(secondPrograms) {
        query += `AND "howManyPrograms" <= ${secondPrograms} `
      }
  
      if(differentNameProgram) {
        query += `AND LOWER("differentNameProgram") LIKE LOWER('%${differentNameProgram}%') `
      }
  
      // if(classes.length > 0) {
      //   const idsOfPrograms = await checkClasses();
      //   console.log(idsOfPrograms)
      // //   query += `AND ( `
      // //   for(let i=0; i<idsOfPrograms.length; i++) {
      // //     query += `${idsOfPrograms.length > 1 && i != 0 ? 'OR ' : ''}"programId" = ${idsOfPrograms[i]} `
      // //   }
      // //   query += `)`
      // }
  
      console.log(query)
      const finalQuery = await client.query(query);
      client.release();
      res.status(200).json(finalQuery.rows);
  } catch(err) {
    client.release();
    res.status(200).json(finalQuery);
  }
 
})

module.exports = router;
