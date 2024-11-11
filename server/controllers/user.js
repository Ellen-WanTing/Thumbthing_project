const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models/user');
const errorFactory = require('../util/errorFactory');
require("dotenv").config();


module.exports={
  createUser:function(req, res){
    const body = req.body;
    const salt = genSaltSync(10);
    body.Password = hashSync(body.Password, salt);
    body.Role = 2;
    model.createUser(body, function(err, results) {
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.end("user created.");
    });
  },
  getAllUser: function(req, res){
    model.getAllUser((err, results)=>{
      if(err){
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(results);
    });
  },
  getUserbyUserID:function(req, res){
    const id = req.params.UserID;
    model.getUserByUserID (id, (err, results)=>{
      if(err){
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if(!results){
        errorFactory.errorHandler(res, 200, "User does not exist.", null);
        return;
      }
      res.status(200);
      res.json(results);
    });
  },
  deleteUser: function(req, res){
    const UserID = req.params.UserID;
    model.deleteUser(UserID, (err, results)=>{
      if(err){
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if(!results){
        errorFactory.errorHandler(res, 200, "Record Not Found OR Provide UserID.", null);
        return;
      }
      res.status(200);
      res.json("{deleted_id:"+req.params.UserID+"}");
    });
  },
  login:function(req,res){
    const body = req.body;
    model.getUserByEmail(body.Email, (err, results)=>{
      if(err){
        errorFactory.errorHandler(res, 500, "User email not found!", err);
        return;
      }
      console.log(results);
      if(!results){
        errorFactory.errorHandler(res, 401, "Invalid email or password.", err);
        return;
      }
      const result = compareSync(body.Password, results.Password);
      if (result){
        results.Password = undefined;
        const jsontoken = jwt.sign({userID: results.UserID},
          process.env.SECRET_KEY/*"abc"*/, {expiresIn :"1h"});
        res.header("auth-token", "Bearer " + jsontoken)
          .json({
            message: "login successfully",
            token : jsontoken
        });
      } else {
        errorFactory.errorHandler(res, 401, "Invalid email or password.", err);
        return;
      }
    });
  },
  getUserbyRole:function(req, res, next){
    const Role = req.query.role;
    model.getUserByRole(Role,(err, results)=>{
      if(err){
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(results);
    })
  },
  editUser:function(req, res){
    const body = req.body;
    const salt = genSaltSync(10);
    body.Password = hashSync(body.Password, salt);
    model.editUser(body, function(err, results) {
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end("user edited.");
    });
  },
  Useronly : function (req, res) {
    res.send("Welcom User.");
  },
  adminonly: function (req, res) {
    res.send("Hello Admin.");
  }
}
