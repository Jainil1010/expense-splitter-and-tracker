import mongoose from 'mongoose';
import { DB_URL } from './env.js';

if (!DB_URL) throw new Error(`Please define the DB_URL in .env`);

const connectToDatabase = async () => {
    try {
        mongoose.connect(DB_URL);
        console.log('Successfully conencted to the database');
    } catch (error) {
        console.log('Error connecting to the database: ', error);
        process.exit(1);
    }
}

export default connectToDatabase;