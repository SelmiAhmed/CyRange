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
  this.NomTraining = inscription.NomTraining;

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
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
  //  console.log("Cours Inscrits: ", res);
    result(null, res);
  });
};

Inscription.getNCoursInscritParUser = async (iduser, result) => {
  let query = `SELECT Count(*)FROM Inscription WHERE IdUser = ${iduser}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
  //  console.log("Cours Inscrits: ", res);
    result(null, res);
  });
};


Inscription.best = async (IdUser,result) => {
  let query = `SELECT Score FROM Inscription WHERE IdUser = ${IdUser} ORDER BY Score ASC `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
    }
  //  console.log("Cours: ", res);
    result(null, res);
    return res;

  });
};






Inscription.create = async (newInscription, result) => {

  let query = `INSERT INTO Inscription (IdUser,IdCours,Date,Score,NomTraining) VALUES `;
  if (newInscription) {
    query += `('${newInscription.IdUser}','${newInscription.IdCours}',${10/02/2022},${50},'${newInscription.NomTraining}')`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(err, null);
      return;
    }
   // console.log("created Inscrire: ", {newInscription });
    result(null, {newInscription });
  });
};
 


Inscription.remove = async (iduser,idcours, result) => {
  
  let query = `DELETE FROM Inscription WHERE IdUser = ${iduser}  and IdCours = ${idcours}  `;
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
   // console.log("deleted inscription with id: ", idcours);
    result(null, res);
  });
};




Inscription.removeAll = async (id,result) => {
  let query = `DELETE FROM Inscription `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log(`deleted ${res.affectedRows} Inscription`);
  });
};




Inscription.updateById = async (id,idc, inscription, result) => {
  let query = `UPDATE Inscription SET Score = '${inscription.Score}' WHERE IdUser = '${id}' and IdCours = '${idc}' `;

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
      if (err) {
      //  console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
    //  console.log("updated score: ", { id: id, ...inscription });
      result(null, { id: id, ...inscription });
    }
  );
};








module.exports = Inscription; 
