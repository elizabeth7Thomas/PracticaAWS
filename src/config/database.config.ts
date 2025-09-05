import { registerAs } from '@nestjs/config';

export const DataBaseConfig = registerAs('db', () => ({
  MONGO_URI: process.env.MONGO_URI,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT ?? '3306'),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
}));
 
//Conexion a la base de datos


