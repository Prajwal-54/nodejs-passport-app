const User=require('../model/User');
const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcryptjs');


module.exports=function(passport){
    passport.use(
    new LocalStrategy(
       {usernameField:'email'},(email, password,done)=>{
          
       User.findOne({email:email}).
       then(
         user=>{
               //match user
               if(!user){
                     return done(null,false,{message:"email not registered"});
               }
              
              bcrypt.compare(password,user.password,(er,isMatch)=>{
                 if(er) throw er;
                 
                 if(isMatch) return done(null,user);
                 else return done(null,false,{message:"incorrect password !!!"});
              }) 
               
         }    
       ).
       catch(er=>console.log(er));
          
             
       }
       
          
          )
    
    );
    
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});    
};