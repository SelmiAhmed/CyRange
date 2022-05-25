const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  

// constructor
const Notif = function(notif) {
  this.IDNotif = notif.IDNotif;
  this.Contenu = notif.Contenu;
  this.Statut = notif.Statut;
  this.DateNotif = notif.DateNotif;

};
  Notif.getAllNotif = async (id, result) => {
  let query = "SELECT * FROM Notifications";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Notif: ", res);
    result(null, res);
  });
};
Notif.getNotifbyID = async (id, result) => {
  let query = `SELECT * FROM Notifications WHERE IDNotif = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Notif: ", res);
    result(null, res);
  });
};








Notif.create = async (newNotif, result) => {

  let query = `INSERT INTO Notifications (Contenu,Statut,DateNotif) VALUES `;
  if (newNotif) {
    query += `('Nouveau Cours sur la platforme ${newNotif.Contenu}','Non Vue',${22/2/2022})`;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created Notif: ", {newNotif });
    result(null, {newNotif });
  });
};
 
Notif.remove = async (id, result) => {
  
  let query = `DELETE FROM Notifications WHERE IDNotif = ${id}`;
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
  //  console.log("deleted Notif with id: ", id);
    result(null, res);
  });
};
Notif.removeAll = async (id,result) => {
  let query = `DELETE FROM Notifications `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log(`deleted ${res.affectedRows} Notif`);
  });
};


module.exports = Notif; 
