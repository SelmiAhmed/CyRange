const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const Cours = function(cours) {
  this.ID = cours.ID;
  this.nom = cours.Username;
  this.Email = cours.Email;
  this.Password = cours.Password;
  this.Image = cours.Image;
  this.Role = cours.Role;

};
Cours.getAll = (id, result) => {
    let query = "SELECT * FROM Cours";
    sql.query(query, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
        return;
      }
     //console.log("Cours: ", res);
      result(null, res);
    });
  };
  
  Cours.getAllCours = async (id, result) => {
  let query = "SELECT * FROM Cours";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Cours: ", res);
    result(null, res);
  });
};
Cours.getCoursbyID = async (id, result) => {
  let query = `SELECT * FROM Cours WHERE IDCours = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Cours: ", res);
    result(null, res);
  });
};
Cours.getCoursNamebyID = async (id, result) => {
  let query = `SELECT NomCours FROM Cours WHERE IDCours = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Cours: ", res);
    result(null, res);
  });
};

module.exports = Cours; 
