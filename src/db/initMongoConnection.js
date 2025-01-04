import mongoose from 'mongoose';
import {
    getEnvVar
} from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
    try {
        const user = getEnvVar('MONGODB_USER');
        const pwd = getEnvVar('MONGODB_PASSWORD');
        const url = getEnvVar('MONGODB_URL');
        const db = getEnvVar('MONGODB_DB');

        await mongoose.connect(
            `mongodb+srv://marynaliashchenko:ri1VmAc94HdyxRoF@cluster0.il1dm.mongodb.net/test?retryWrites=true&w=majority`,
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log('Error while setting up mongo connection', error);
        process.exit(1);
    }
};
