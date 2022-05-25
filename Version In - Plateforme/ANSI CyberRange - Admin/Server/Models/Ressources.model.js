const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const Ressource = function(ressource) {
  this.NomRes = ressource.NomRes;
  this.Description = ressource.Description;
  this.OS = ressource.OS;
  this.Size = ressource.Size;


};
Ressource.getAll = (id, result) => {
    let query = "SELECT * FROM Ressources";
    sql.query(query, (err, res) => {
      if (err) {
     //  console.log("error: ", err);
        result(null, err);
        return;
      }
     // console.log("Ressource: ", res);
      result(null, res);
    });
  };
  
  Ressource.getAllRessource = async (id, result) => {
  let query = "SELECT * FROM Ressources";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Ressource: ", res);
    result(null, res);
  });
};
Ressource.getRessourcebyID = async (id, result) => {
  let query = `SELECT * FROM Ressources WHERE IDRes = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Ressource: ", res);
    result(null, res);
  });
};








Ressource.create = async (newRes, result) => {

  let query = `INSERT INTO Ressources (NomRes,Description,OS,Size) VALUES `;
  if (newRes) {
    //query += `('SQLIN','XYZ','NULL','ATTACKS','FACILE',${2},${10},${0})`;

    query += `('${newRes.NomRes}','${newRes.Description}','${newRes.OS}','${newRes.Size}')`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(err, null);
      return;
    }
   // console.log("created Ressource: ", {newRes });
    result(null, {newRes });
  });
};
 
Ressource.remove = async (id, result) => {
  
  let query = `DELETE FROM Ressources WHERE IDRes = ${id}`;
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
   // console.log("deleted Ressource with id: ", id);
    result(null, res);
  });
};
Ressource.removeAll = async result => {
  let query = `DELETE FROM Ressource `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log(`deleted ${res.affectedRows} Ressource`);
    result(null, res);
  });
};
Ressource.updateById = async (id, ressource, result) => {
  let query = `UPDATE Ressources SET NomRes = '${ressource.NomRes}', Description = '${ressource.Description}', OS = '${ressource.OS}', Size = '${ressource.Size}' WHERE IDRes = ${id}`;

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
      if (err) {
     //   console.log("error: ", err);
        result(null, err);
        return;
      }
       if (res.affectedRows == 0) {
        // not found ressource with the id
        result({ kind: "not_found" }, null);
        return;
      }
     // console.log("updated ressource: ", { id: id, ...ressource });
      result(null, { id: id, ...ressource });
    }
  );
};


Ressource.nombre = async (result) => {
  let query = `SELECT Count(*) FROM Ressources`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
    }
   // console.log("Ressources: ", res);
    result(null, res);
  //  return res.toString();

  });
};




module.exports = Ressource; 
