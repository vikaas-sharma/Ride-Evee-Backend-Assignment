const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const UserModel=require('../models/userModel'); 
const validateUser = require('../utils/validateUser');
const registerController=async(req,res)=>{

 try{
  const {error}=validateUser(req.body);//validate using the function
  if(error){
    return res.status(400).send({
      success:false,
      message:'Validation error',
      details:error.details
    });
  }
   const {name,email,phone,password,role}=req.body;
  //  console.log(req);

  //validation
  if(!name || !email || !phone|| !password){
    return res.status(500).send({
        success:false,
        message:'Please Provide all Fields'
    })
}
  // Check if the email or phone already exists
  const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });

  if (existingUser) {
    return res.status(400).send({
      success: false,
      message: existingUser.email === email 
        ? 'Email already registered' 
        : 'Phone number already registered'
    });
  }
  const saltRounds=10;
  const hashedPassword=await bcrypt.hash(password,saltRounds);
  const user = await UserModel.create({name,email,phone,password:hashedPassword,role});
  
  // console.log(user._id)
  const token=jwt.sign(
    {id: user._id,email: user.email,role: user.role},
    process.env.JWT_SECRET_KEY,
     {expiresIn:'1h'}
    );
   
  //  await user.save();
   res.status(201).send({
    success:true,
    message:'Successfully registered',
    user,
    token
   })

 }catch(error){
       console.log(error);
       res.status(500).send({
        success:false,
        message:'Error in Register API',
        error:error.message
       })
 }
};

const getAllUsersController = async (req, res) => {
  try {
    console.log(req.headers)
      const users = await UserModel.find({});
  
    //   users.forEach(user => {
    //     console.log(user._id); // Log the _id of each user
    // });

      res.status(200).send({
          success: true,
          message: 'Users retrieved successfully',
          users
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: 'Error in fetching users',
          error: error.message
      });
  }
};

const getUserController=async(req,res)=>{
  try{
    const {id}=req.params;
     const user = await UserModel.findById(id);
     if(!user) return res.status(404).send({
      success:false,
      message:'User Not Found',
     })
     res.status(201).send({
      success:true,
      message:'User Found Successfully',
      user
     })
  }catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error in fetching  user by Id',
        error: error.message
    });
  }
}

const updateUserByIdController=async(req,res)=>{
  try{
    //find user
    const {id}=req.params;
    // console.log("req.body._id",req.user.id)
    const user = await UserModel.findById(id);
    // console.log("user.id",id)
    //validation
    if(!user){
         return res.status(404).send({
              success:false,
              message:'User Not Found'
         })
    }
    //ensure the logged-in user is updating their own data or is an admin
    if(user.id !== req.user.id && req.user.role !== 'admin')
    {
      return res.status(403).send({
        success:false,
        message:'Unauthorized to update this user'
      })
    }
    //update user
    const {name,email,phone,role} =req.body;
       if(name) user.name = name;
       if(email) user.email = email;
       if(phone) user.phone = phone;
       if(role) user.role=role;
    //save user
    await user.save();
    res.status(200).send({
         success:true,
         message:'User updated Successfully'
    })

}catch(error){
    console.log(error);
    res.status(500).send({
         success:false,
         message:'Error in update User API',
         error: error.message
    })
}
}

const deleteUserByIdController=async(req,res)=>{
  try{
    const {id}=req.params;
    const user = await UserModel.findById(id);
    if(!user){
      return res.status(404).send({
           success:false,
           message:'User Not Found'
      })
}

//ensure that logged-in user is deleting their own data or is an admin
if(user.id !== req.user.id && req.user.role !== 'admin')
  {
    return res.status(403).send({
      success:false,
      message:'Unauthorized to delete this user'
    })
  }

// await user.remove();
res.status(200).send({
  success:true,
  message:'User Deleted SuccessFully'
})
  }catch(error){
    res.status(500).send({
      success:false,
      message:'Error in delete User API',
      error: error.message
    })
  }

}
module.exports={registerController,getAllUsersController,getUserController,updateUserByIdController,deleteUserByIdController};