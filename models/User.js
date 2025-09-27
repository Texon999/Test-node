import pool from '../db/db.js' ;


import {differenceInYears} from 'date-fns' ;


const CalculoEdad = (fecha_nacimiento)=> {

const fechahoy = new Date();
const fechanac = new Date (fecha_nacimiento);

if (isNaN(fechanac.getTime())){

    throw new Error ('Fecha de nacimiento no valida')
}

return differenceInYears(fechahoy,fechanac) ;


}


export class userModel {


static async getAll(){

    const [data] = await pool.execute (`
        
        SELECT 
        BIN_TO_UUID(id_usuario) as id_usuario,
        nombre,
        apellido 
        FROM usuario

        
        
        `); 
         return data ;

  }
  
  

   static async getId (id,fecha_nacimiento=null){

 const [data] = await pool.query (`
        
        SELECT 
        BIN_TO_UUID(id_usuario) as id_usuario,
        nombre,
        apellido 
        FROM usuario
        WHERE id_usuario = UUID_TO_BIN(?)
        
        
        `,[id]); 
   
        if (data.length === 0) return null 

        const user =data[0]
        if (fecha_nacimiento) {
      user.edad = CalculoEdad(fecha_nacimiento);
      user.fecha_nacimiento = fecha_nacimiento
    }

    return user ;

  }


  static async create ( input ){
    const { nombre, apellido } = input 
    const [uuidResult] = await pool.query('SELECT UUID() as uuid;');
    const [{ uuid }] = uuidResult;
  try {
    await pool.query(
      `INSERT INTO usuario (id_usuario, nombre,  apellido)
       VALUES (UUID_TO_BIN(?), ?, ?);`,
      [uuid, nombre,  apellido]
    );
  } catch (e) {
    throw new Error('Error al crear al jugador');
  }

  const [user] = await pool.query (`
    SELECT 
    BIN_TO_UUID(id_usuario) as id_usuario ,
    nombre,
    apellido 
    FROM usuario
    WHERE id_usuario = UUID_TO_BIN(?)
    `,
    [uuid]
);
 return user[0] ;

}

 static async delete ( id ){
   
  const [data2] = await pool.query('DELETE FROM estadisticas WHERE id_usuario = UUID_TO_BIN(?)', [id])
  const [data] = await pool.query('DELETE FROM usuario WHERE id_usuario = UUID_TO_BIN(?)', [id])
  


 // EL ERROR era que manejaba usuario como id = ? y debia convertirlo en binario pq asi maneje el modelo
 // debo convertirlo para que concuerde con mi db
 // UUID_TO_BIN('texto') → convierte de texto a binario (para comparar con tu columna binaria).
 //BIN_TO_UUID(columna) → convierte de binario a texto (para mostrar en SELECTs).
  return (data.affectedRows + data2.affectedRows) > 0  // esto devuelve true o false
  
 // en la relacion necesitaba poner delete on cascade para que se me borrara todo con stats
}


static async patch (id,data){

if (!data || Object.keys(data).length === 0 )
  return false ;

const fields = Object.keys(data) ; 
const values = Object.values(data) ;

const setClause = fields.map(field => `${field} = ?`).join(', ');

const [ result ] = await pool.query (`
  
  UPDATE usuario SET ${setClause} WHERE id_usuario = UUID_TO_BIN(?)
  `, [...values, id]
);
return result.affectedRows > 0;
}



}
  












