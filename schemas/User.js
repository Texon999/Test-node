import { z } from 'zod'

export const UserSchema = z.object({
    nombre: z.string()
    .min(1, 'El nombre debe tener mas de 1 caracter')
    .max(50, 'El nombre no puede tener mas de 50 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'),

    apellido: z.string()
    .min(1, 'El apellido debe tener mas de un caracter')
    .max(50, 'El apellido no puede tener mas de 50 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'El apellido solo puede contener letras y espacios'),
 
    fecha_nacimiento: z.string()
    .optional()  
    .refine(fecha => !fecha || !isNaN(Date.parse(fecha)), { 
        message: 'La fecha de nacimiento no es valida' 
    })
    .refine(fecha => !fecha || new Date(fecha) <= new Date(), { 
        message: 'La fecha de nacimiento no puede ser en el futuro' 
    })
    .transform(fecha => fecha ? new Date(fecha) : undefined)
})



export const UserUpdateSchema =  UserSchema.partial() 