import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';


dotenv.config();

const getEnvVar = (key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return process.env[key];
};

cloudinary.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_CLOUD_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_CLOUD_API_SECRET'),
});

console.log('Cloudinary configured with:', process.env.CLOUDINARY_CLOUD_NAME);

export default cloudinary;

