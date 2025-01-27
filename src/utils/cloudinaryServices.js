import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();


export const CLOUDINARY = {
  NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_CLOUD_API_KEY,
  API_SECRET: process.env.CLOUDINARY_CLOUD_API_SECRET,
};

cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY.NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});


export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response;
};


export const deleteFileFromCloudinary = async (publicId) => {
  const response = await cloudinary.uploader.destroy(publicId);
  return response;
};