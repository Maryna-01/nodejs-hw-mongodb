import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

(async () => {
  try {
    console.log('Testing Cloudinary upload...');
    const result = await cloudinary.uploader.upload('./uploads/foto.jpg');
    console.log('Upload successful:', result.secure_url);
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message);
  }
})();