import { NextApiRequest, NextApiResponse } from "next";
import { connToDatabase, disconnFromDB } from "../../utils/db";
import { InsertData } from "../../interfaces";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const conn = await connToDatabase();

        try {
            const { table, data } = req.body as InsertData;
            if (!table || !data) {
                return res.status(400).json({ success: false, message: 'Invalid request body' });
            }

            const placeHolders = Object.keys(data).map(() => '?').join(',');
            const columns = Object.keys(data).join(',');

            const query = `INSERT INTO ${table} (${columns}) VALUES (${placeHolders})`;
            console.log('Executing query:', query);
            const [results] = await conn.execute(query, Object.values(data));

            console.log('Data inserted successfully:', results);

            res.status(200).json({ success: true, message: 'Data inserted successfully' });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } finally {
            await disconnFromDB();
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};