import express from 'express';
import dotenv from 'dotenv';
import indexRoute from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/', indexRoute);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});