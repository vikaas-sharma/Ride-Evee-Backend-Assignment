const express=require('express');
const dotenv =require('dotenv');
const morgan=require('morgan');
const { connectdB } = require('./config/dB');
const userRoutes=require('./routes/userRoutes')
const app=express();
app.use(express.json());
//dotenv configuration
dotenv.config();
connectdB();
app.use(morgan("dev"))

//routes
app.use('/api',userRoutes);


// app.get('/',(req,res)=>{
//     res.send('<h2>Hello world</h2>');
// })

app.listen(8080,()=>{
    console.log('app listening on port 8080')
})