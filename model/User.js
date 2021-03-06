const mongo=require('mongoose');
const userSchema= new mongo.Schema({
  name:{
    type:String,
    required:true
  }
  ,email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
  
});

const userModel=mongo.model('User',userSchema);

module.exports=userModel;
