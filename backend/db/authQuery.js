import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized: false
    //     }
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
.then((client)=>{
    console.log('connected to DATABASE');
    client.release();
})
.catch(e=>{
    console.log(`Error in connection with DATABASE: ${e.message}`)
})

export { pool as authClient }; 

// TODO: for reference *****************
// import pg from "pg"
// import dotenv from "dotenv"
// dotenv.config();


// const { Client } = pg;

// const password = process.env.DB_PASSWORD;
// console.log("password", String(password));
// console.log("password type", typeof password);
// console.log("PORT", process.env.PORT);


// if (!password) {
//     throw new Error("No database password provided");
// }

// if (!process.env.DATABASE_URL) {
//     throw new Error("No database URL provided");
// }

// const connectionString = `postgresql://postgres:${password}@localhost:5432/user_auth_db`;

// let client;

// export default async function getConnection(){
//     if (!client) {
//         client = new Client({
//             connectionString: connectionString,
//         });

//         try {
//             await client.connect();
//             console.log("Connected to creatorX DB");
//         } catch (err) {
//             console.log(`Error in connection with DATABASE: ${err.message}`);
//         }
//     }

//     return client;
// }

// getConnection();