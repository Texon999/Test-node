import { statsModel } from '../models/Stats.js'
import { StatsSchema } from '../schemas/Stats.js'
export class controllerStats {
  static async getId (req, res) {
    try {
      const { id } = req.params
      const stats = await statsModel.getId(id)
      if (!stats) {
        return res.status(404).json({ error: 'Stats no encontradas para este jugador' })
      }
      res.json(stats)
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las stats' })
    }
  }
  static async create (req, res) {
    const result = StatsSchema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({ 
        error: result.issues.map(err=>({
         campo: err.path.join('.'),
         mensaje: err.message
        }) ) 
      })
    }
    try {
      const newStats = await statsModel.create(result.data)
      res.status(201).json(newStats)
    } catch (err) {
      res.status(500).json({ error: 'Error al crear las stats' })
    }
  }
}
