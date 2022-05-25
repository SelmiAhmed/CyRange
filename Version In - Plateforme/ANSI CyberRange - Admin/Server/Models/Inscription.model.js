const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  
const { randomInt } = require("crypto");

// constructor
const Inscription = function(inscription) {
  this.IdUser = inscription.IdUser;
  this.IdCours = inscription.IdCours;
  this.Date = inscription.Date;
  this.Score = inscription.Score;

};

Inscription.getCoursInscrit = async (id, result) => {
  let query = "SELECT * FROM Inscription";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
  //  console.log("Users: ", res);
    result(null, res);
  });
};
Inscription.getCoursInscritParUser = async (iduser, result) => {
  let query = `SELECT * FROM Inscription WHERE IdUser = ${iduser}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Cours Inscrits: ", res);
    result(null, res);
  });
};


Inscription.removeuser = async (IdUser, result) => {
  
  let query = `DELETE FROM Inscription WHERE IdUser = ${IdUser}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
  //    console.log("error: ", err);
      result(null, err);
      return;
    }
    else if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
  //  console.log("deleted inscription with id: ", IdUser);
    result(null, res);
  });
};

Inscription.removetrain = async (IdTraining, result) => {
  
  let query = `DELETE FROM Inscription WHERE IdCours = ${IdTraining}`;
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
  //  console.log("deleted inscription with id: ", IdTraining);
    result(null, res);
  });
};












module.exports = Inscription; 
