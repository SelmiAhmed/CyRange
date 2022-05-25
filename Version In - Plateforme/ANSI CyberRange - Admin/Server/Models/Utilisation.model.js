const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  
const { randomInt } = require("crypto");

// constructor
const Utilisation = function(Utilisation) {
  this.IdCours = Utilisation.IdCours;
  this.IdRes = Utilisation.IdRes;

  this.DateUtil = Utilisation.DateUtil;
  this.Performance = Utilisation.Performance;

};

Utilisation.getResUtilise = async (id, result) => {
  let query = "SELECT * FROM Utilisation";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Users: ", res);
    result(null, res);
  });
};
Utilisation.getMachineUseParCours = async (idcours, result) => {
  let query = `SELECT * FROM Utilisation WHERE IdCours = ${idcours}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
  //  console.log("Machine Utilisées: ", res);
    result(null, res);
  });
};

Utilisation.create = async (newUtilisation, result) => {

  let query = `INSERT INTO Utilisation (IdCours,IdRes,DateUtil,Performance) VALUES `;
  if (newUtilisation) {
    query += `('${newUtilisation.IdCours}','${newUtilisation.IdRes}','${newUtilisation.DateUtil}','${newUtilisation.Performance}')`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(err, null);
      return;
    }
  //  console.log("created UseofRessource: ", {newUtilisation });
    result(null, {newUtilisation });
  });
};
 


Utilisation.remove = async (idcours,idres, result) => {
  
  let query = `DELETE FROM Utilisation WHERE IdCours = ${idcours}  and IdRes = ${idres}  `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
  //  console.log("deleted Utilisation with id: ", idres);
    result(null, res);
  });
};




Utilisation.removeAll = async (IdCours, result) => {
  
  let query = (`DELETE FROM Utilisation WHERE IdCours = ${IdCours}`);
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
  //  console.log("deleted Utilisation with id: ", IdCours);
    result(null, res);
  });
};











module.exports = Utilisation; 
