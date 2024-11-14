const mongoose=require('mongoose');
//schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'name is required']
    },
    phone:{
        type:String,
        unique:true,
        required:[true,'name is required']
    },
    password:{
        type:String,
        required:[true,'name is required']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

module.exports=mongoose.model('User', userSchema);