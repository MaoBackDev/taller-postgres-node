import pkg from 'pg';
const { Pool } = pkg;

 
const pool = new Pool({
  host: 'localhost',
  user: 'maodev',
  password: "maodev2023",
  database: "db_taller",
  port: "5432",
})


export default pool;