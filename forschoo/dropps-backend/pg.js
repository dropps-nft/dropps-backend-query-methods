import pg from 'pg';
const Client = pg.Client;
import dotenv from 'dotenv'
dotenv.config();
export default async function connectPg(text,values){
const client = new Client({
  user:process.env.USERNAME,
  host:process.env.HOST,
  database:process.env.DATABASE,
  password:process.env.PASSWORD,
  port:process.env.PORTDB,
})
const test= await client.connect()
var x=await client.query(text,values);
client.end()
try{
  return x.rows[0];
}
catch(error){console.log('speaky');return error}
}
