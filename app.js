const exp=require('express');
const app=exp();
const PORT=process.env.PORT||3000;
const Elayouts=require('express-ejs-layouts');
const mongo=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
//mongo bd
const db=require('./config/mongo').mongoURI;
//passport
require('./config/passport')(passport);


mongo.connect(db,{ useNewUrlParser: true,
                    useUnifiedTopology: true})
.then(()=>console.log('mongoBD connected ... '))
. catch (e=>console.log(e));


//views
app.use(Elayouts);
app.set('view engine','ejs');


//bodyparser (for post request handling)
app.use(exp.urlencoded({extended:false}));

//session
app.use(session({
   secret:"secret",
   resave:true,
   saveUninitialized:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect-flash
app.use(flash());

//globals

app.use((req,res,next)=>{
 res.locals.success_msg=req.flash('success_msg');
 
 res.locals.error_msg=req.flash('error_msg');
 res.locals.error=req.flash('error');
 next();
});



//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/users',require('./routes/users'));


app.listen(PORT, console.log(`server running on PORT :${PORT}`));


