import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar('CLOUD_NAME'),
  api_key: getEnvVar('CLOUD_API_KEY'),
  api_secret: getEnvVar('CLOUD_API_SECRET'),
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
