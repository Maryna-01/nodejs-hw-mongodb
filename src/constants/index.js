import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_CLOUD_API_KEY',
  API_SECRET: 'CLOUDINARY_CLOUD_API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');