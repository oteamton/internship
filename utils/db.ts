import mysql, { Connection, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';
let pool: Pool;

dotenv.config();

// create the connection to database
export async function connToDatabase(): Promise<Connection> {
    try {
        if (!pool) {
            pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER ,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
        }

        return await pool.getConnection();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

export async function disconnFromDB(): Promise<void> {
    if (pool) {
        await pool.end();
    }
};

