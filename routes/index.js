const exp=require('express');
const routes=exp.Router();
const {ensureAuthenticated}=require('../config/auth');

routes.get('/',(req,res)=>res.render('home'));
routes.get('/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard',{
      name:req.user.name
}));

module.exports=routes;