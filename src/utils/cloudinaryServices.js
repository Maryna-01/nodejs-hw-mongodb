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
  if (!file?.path) {
    throw new Error('File path is missing');
  }

  console.log('Uploading file to Cloudinary:', file.path);

  try {
    const response = await cloudinary.uploader.upload(file.path);
    console.log('Upload successful:', response.secure_url);
    await fs.unlink(file.path);
    console.log('File deleted locally:', file.path);
    return response;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error.message);
    throw error;
  }
};

export const deleteFileFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new Error('Public ID is required to delete file');
  }

  console.log('Deleting file from Cloudinary:', publicId);

  try {
    const response = await cloudinary.uploader.destroy(publicId);
    console.log('File deleted from Cloudinary:', response);
    return response;
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error.message);
    throw error;
  }
};
