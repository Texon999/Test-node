import { userModel } from '../models/User.js'
import { statsModel } from '../models/Stats.js'
import { UserSchema } from '../schemas/User.js'
import { UserUpdateSchema } from '../schemas/User.js'
export class controllerUser {
  
  static async getAll(req, res) {
    try {
      const { fecha_nacimiento } = req.query

      const users = await userModel.getAll(fecha_nacimiento ?? null)
      res.json(users)
    } catch (err) {
      res.status(500).json({ error: 'Error: No se pudieron obtener todos los jugadores' })
    }
  }

  static async getId(req, res) {
  try {
    const { id } = req.params;
    const { fecha_nacimiento } = req.query;

    
  
    const user = await userModel.getId(id, fecha_nacimiento ?? null);

    if (!user) {
      return res.status(404).json({ error: 'Jugador no encontrado' });
    }

  
    const stats = await statsModel.getId(id);

   
    user.stats = stats ?? null; 

    res.json(user);

  } catch (err) {
    console.error('Error en el controlador getId:', err);
    res.status(500).json({ error: 'Error, no se pudo completar la solicitud para encontrar al jugador' });
  }
}

  static async create(req, res) {
    try {
      const result = UserSchema.safeParse(req.body)

      if (!result.success) {
        return res.status(400).json({ error: result.error.message })
      }

      const newUser = await userModel.create(result.data)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({ error: 'Error interno al crear el jugador' })
    }
  }

  static async delete(req, res) {
    try{
  const { id } = req.params 

  const deleted = await userModel.delete(id)

  if (!deleted)
  {
    return res.status(404).json({ error: 'Usuario no encontrado mi rey' })
  }
  res.json({ message: 'Usuario eliminado correctamente' })
  } catch (err){
    console.error ('Error papu')
    res.status(500).json({error: 'Error al eliminar el usuario'})
  }
  }
static async patch (req, res) {
  try {
    const { id } = req.params;
    const body = req.body;

    

    const result = UserUpdateSchema.safeParse(body);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues.map(err => ({
          campo: err.path.join('.'),
          mensaje: err.message
        }))
      });
    }

    const updated = await userModel.patch(id, result.data); 

    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado o sin cambios' });
    }

    res.json({ message: 'Usuario actualizado correctamente' });

  } catch (err) {
    console.error('Error en patch', err);
    res.status(500).json({ error: 'Se jodió el patch' });
  }
}


}
