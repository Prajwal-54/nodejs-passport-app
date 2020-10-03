const exp = require('express');
const routes = exp.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const passport=require('passport');

routes.get('/login', (req, res)=>res.render('login'));
routes.get('/register', (req, res)=>res.render('register'));

//register post req
routes.post('/register', (req, res)=> {

  const {
    name, email, password, password2
  } = req.body;
  let err = [];
  if (!name || ! email || ! password||! password2) {
    err.push({
      msg: "Fill all fields correctly ! !"
    });
  }
  if (password.length < 6) {
    err.push({
      msg: "password length should be more than 5"
    });
  }
  if (password !== password2) {
    err.push({
      msg: "passwords dont match"
    });
  }
  if (err.length > 0) {
    res.render('register', {
      err,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).
    then(user=> {
      //user already exist
      if (user) {
        err.push({
          msg: "email already registered !"
        });
        res.render('register', {
          err,
          name,
          email,
          password,
          password2
        }
        );
      } else {
        //create new user
        const newUser = new User({
          name,
          email,
          password
        });

        //hashing passwords
        bcrypt.genSalt(10, (err, salt)=>bcrypt.hash(newUser.password, salt, (err, hash)=>
        {
          if (err) throw err;

          newUser.password = hash;

          newUser.save().
          then(user=>
          {
           req.flash('success_msg','registered successfully !');  
          res.redirect('/users/login')
          }).
          catch(er=>console.log(er));
        })
        );


      }


    });
  }
});

//login post request handling
routes.post('/login',(req,res,next)=>{
   passport.authenticate(
         'local',
         {
             successRedirect:'/dashboard',
             failureRedirect:'/users/login',
             failureFlash:true
         }
         )(req,res,next);
      
});

routes.get('/logout',(req,res)=>{
      req.logout();
      
      req.flash('success_msg','logout successfully !!!');
      res.redirect('/users/login');
      
});
module.exports = routes;