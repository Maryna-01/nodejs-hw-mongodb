import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';


const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.HOST),
  port: Number(getEnvVar(SMTP.PORT)),
  auth: {
    user: getEnvVar(SMTP.USER),
    pass: getEnvVar(SMTP.PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: getEnvVar(SMTP.FROM),
      ...options,
    });
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
