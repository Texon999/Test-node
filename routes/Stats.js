import { Router } from 'express'
import { controllerStats } from '../controllers/Stats.js'

const router = Router()

router.get('/:id', controllerStats.getId)  
router.post('/', controllerStats.create)   

export default router
