const mongoose=require('mongoose');
//function for mongodB connection
const connectdB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to mongodb Database');
    }catch(error){
        console.log('DB error',error);
    }
}

module.exports={connectdB};