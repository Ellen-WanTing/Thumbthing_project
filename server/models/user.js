const db = require('../util/database');


module.exports={
  createUser:function(data, callback) {
    db.query('INSERT INTO User(Fullname, Email, Password, Role) VALUES(?, ?, ?, ?)',
    [data.Fullname,data.Email, data.Password, data.Role], (error, results, fields) => {
        return callback(error, results);
      }
    );
  },
  getAllUser:function(callback){
    db.query('SELECT UserID, FullName, Email, Role FROM User ', [],
      (error, results, fields)=>{
        return callback(error, results);
      }
    );
  },
  getUserByUserID:function(UserID, callback){
    db.query('SELECT * FROM User WHERE UserID = ?', [UserID],
      (error, results, fields)=>{
        return callback(error, results[0]);
      }
    );
  },
  getUserByRole:function(Role, callback){
    db.query('SELECT FullName, Email, Role FROM User WHERE Role = ?', [Role],
      (error, results, fields)=>{
        return callback(error, results);
      }
    );
  },
  getUserByEmail:function(Email, callback){
    db.query('SELECT * FROM User WHERE Email = ? ', [Email],
      (error, results, fields)=>{
        return callback(error, results[0]);
      }
    );
  },
  deleteUser:function(UserID, callback){
    db.query('DELETE FROM User WHERE UserID = ? ', [UserID],
      (error, results, fields)=>{
        return callback(error, results);
      }
    );
  },
  editUser:function(data, callback){
    db.query('UPDATE User SET `FullName` = ?, `Email` = ?, `Password` = ? WHERE `UserID` = ?',
    [data.Fullname, data.Email, data.Password, data.UserID], (error, results, fields) => {
        return callback(error, results);
      }
    );
  }
};
