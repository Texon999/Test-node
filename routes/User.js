import { Router } from 'express'
import { controllerUser } from '../controllers/User.js'

const router = Router()

router.get('/', controllerUser.getAll)     
router.get('/:id', controllerUser.getId)   
router.post('/', controllerUser.create)   
router.delete('/:id', controllerUser.delete)
router.patch('/:id', controllerUser.patch)
export default router
