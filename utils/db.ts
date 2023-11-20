import mysql, { Connection, Pool } from 'mysql2/promise';

let pool: Pool;

// create the connection to database
export async function connToDatabase(): Promise<Connection> {
    try {
        if (!pool) {
            pool = mysql.createPool({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || 'SWU-Int-Dev',
            });
        }

        return await pool.getConnection();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export async function disconnFromDB(): Promise<void> {
    if (pool) {
        await pool.end();
    }
}

