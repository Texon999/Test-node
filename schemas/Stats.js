import { z } from 'zod';

// Asignamos el validador a una variable
const uuidSchema = z.string().uuid('El ID de usuario no es válido');

export const StatsSchema = z.object({
  danio: z.number()
    .min(0, 'El daño mínimo es de 0')
    .max(10, 'El daño máximo es de 10'),

  mana: z.number()
    .min(0, 'El mana debe ser de mínimo 0')
    .max(10, 'El mana máximo es de 10'),

  id_usuario: uuidSchema  // esto pa que no me de el error ese de señalarme el id para validarlo
});