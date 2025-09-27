

import pool from '../db/db.js'


export class statsModel {


static async getId (id){

const [data] = await pool.query (`
    
    SELECT 
    BIN_TO_UUID(id_stats) as id_stats ,
    danio,
    mana,
    BIN_TO_UUID(id_usuario) as id_usuario
    FROM estadisticas 
    WHERE id_usuario = UUID_TO_BIN(?)
    
    ` , [id])
 if (data.length === 0) return null 

   const stats =data[0]

   return stats;
}


static async create (input) {

const { danio, mana , id_usuario} = input 
 const [uuidResult] = await pool.query('SELECT UUID() as uuid;');
    const [{ uuid }] = uuidResult;
  try {
    await pool.query(
      `INSERT INTO estadisticas (id_stats, danio, mana,id_usuario)
       VALUES (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?) );`,
      [uuid, danio,  mana,id_usuario]
    );
  } catch (e) {
    throw new Error('Error al crear las stats');
  }

const [stats] = await pool.query (`
    SELECT 
    BIN_TO_UUID(id_stats) as id_stats ,
    danio,
    mana,
    BIN_TO_UUID(id_usuario) as id_usuario
    FROM estadisticas 
    WHERE id_stats = UUID_TO_BIN(?)
    `,
    [uuid]
);
 return stats[0] ;


}


}