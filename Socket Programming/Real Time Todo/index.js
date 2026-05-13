import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from "./db.config.js";
import {server} from './server.js'

// Connect to database and start server
connectToDatabase().then(() => {
    server.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error('Failed to connect to database:', err);
});