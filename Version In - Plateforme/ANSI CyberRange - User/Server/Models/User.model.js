const sql = require("../DBOps");
const config = require('../DBConfig')
var sql2 = require('mssql/msnodesqlv8');  
const { randomInt } = require("crypto");

// constructor
const User = function(user) {
  this.Username = user.Username;
  this.Email = user.Email;
  this.Password = user.Password;
  this.Image = user.Image;

  this.Role = user.Role;
  this.DateCreation = user.DateCreation
};

User.getUsers = async() => {
  try {
      const pool = await sql2.connect(config);
      const users = await pool.request() .query('SELECT ID,Username,Email from Users');
      console.log(users);
      return users;
  }
  catch(error) {
      console.log(error);
  }
}
User.getAllUsers = async (id, result) => {
  let query = "SELECT * FROM Users";
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
   //   console.log("error: ", err);
      result(null, err);
      return;
    }
   // console.log("Users: ", res);
    result(null, res);
  });
};
User.getUserbyID = async (id, result) => {
  let query = `SELECT * FROM Users WHERE IdUser = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Users: ", res);
    result(null, res);
  });
};
User.getUserbyName = async (Username, result) => {
  let query = `SELECT * FROM Users WHERE Username = `;
  query += `'${Username}'`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
    //  console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Users: ", res);
    result(null, res);
  });
};



User.getUserbyMail = async (Email, result) => {
  let query = `SELECT * FROM Users WHERE Email =`;
  query += `'${Email}' and Role ='User'`;
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

User.create = async (newUser, result) => {

  let query = `INSERT INTO Users (Username,Email,Password,Image,Role,DateCreation) VALUES `;
  let query2 = `IF NOT EXISTS(SELECT Username,Email,Password FROM Users) BEGIN INSERT INTO Users (Username,Email,Password,Image,Role,DateCreation) VALUES `;

  var date = new Date();
  if (newUser) {
    query += `('${newUser.Username}','${newUser.Email}','${newUser.Password}','Null','User',${date.toLocaleDateString()}) `;
  }

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     console.log("error: ", err);
      //result(err, null);
    }
   
    else console.log("created User: ", {newUser });
    //result(null, {newUser });
  });
};
 


User.remove = async (id, result) => {
  
  let query = `DELETE FROM Users WHERE IdUser = ${id}`;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
     // console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.rowsAffected == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted User with id: ", id);
    result(null, res);
  });
};





User.updateById = async (id, user, result) => {
  let query = `UPDATE Users SET Username = '${user.Username}', Password = '${user.Password}' WHERE IdUser = '${id}' `;

  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};




User.UserName = async ( result) => {
  let query = `SELECT Username FROM Users `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Users: ", res);
    result(null, res);
  });
};


User.Email = async ( result) => {
  let query = `SELECT Email FROM Users `;
  const pool = await sql2.connect(config);
  const data = await pool.request() .query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("Users: ", res);
    result(null, res);
  });
};




module.exports = User; 
