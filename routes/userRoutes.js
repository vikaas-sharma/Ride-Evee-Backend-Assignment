const express=require('express');
const { registerController, getAllUsersController, getUserController, updateUserByIdController, deleteUserByIdController} = require('../controllers/userController');
const auth=require('../middleware/authMiddleware')
const router=express.Router();

router.post('/users', registerController);
router.get('/users', getAllUsersController);
router.get('/users/:id', getUserController);
router.put('/users/:id', auth, updateUserByIdController);
router.delete('/users/:id', auth, deleteUserByIdController);



module.exports=router;