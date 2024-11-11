const jwt =require("jsonwebtoken");
const db = require('../util/database');
const roles = {admin:"1", user:'2'}
const errorFactory = require('../util/errorFactory');
const model = require('../models/user');
require("dotenv").config();


module.exports ={
    checkToken:function(req, res, next){
        const authHearder = req.headers['authorization']
        console.log("Authorization Header:"+authHearder)   
        // console.log("Body Authorization:"+req.body.headers.Authorization)
             
        const token = authHearder && authHearder.split(' ')[1]
        if(token == null) {
          errorFactory.errorHandler(res, 401, "Access Denied.", null);
          return;
        }
        console.log("1.. " + authHearder);
        console.log("2.. " + token);
        jwt.verify(token, process.env.SECRET_KEY /*"abc"*/, (err, decoded) =>{
            if (err) {
              errorFactory.errorHandler(res, 401, "Invalid Token.", err);
              return;
            } else {
              const UserID =decoded.userID;
              console.log(UserID)
              req.userID = UserID;
              next();
            }
        })
    },
    userOnly:function(req, res, next) {
      model.getUserByUserID (req.userID, (err, result)=>{
        if(err){
          errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
          return;
        }
        if (result.Role == roles.admin || result.Role == roles.user) {
          next();
        } else {
          errorFactory.errorHandler(res, 401, "Access Denied.", null);
          return;
        }
      });
    },
    adminOnly:function(req, res, next) {
      model.getUserByUserID (req.userID, (err, result)=>{
        if(err){
          errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
          return;
        }
        if (result.Role == roles.admin) {
          next();
        } else {
          errorFactory.errorHandler(res, 401, "Access Denied.", null);
          return;
        }
      });
    }
}
