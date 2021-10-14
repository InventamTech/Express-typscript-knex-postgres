import { Router } from 'express';
const router = Router();
import {findAll,create,update,findById,userDelete} from '../../controller/user.controller';


// Retrieve all user
router.get('/', findAll);

// Create a new user
router.post('/', create);

// Update a user with id
router.put('/:id',update);

// Retrieve a single user with id
router.get('/findById/:id',findById);

// // Delete a user with id
router.delete('/:id',userDelete);





export default router;
