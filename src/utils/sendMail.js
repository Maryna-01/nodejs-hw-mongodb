import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { SMTP } from "../constants/index.js";
import { getEnvVar } from "./getEnvVar.js";

const transporter = nodemailer.createTransport({
  host: getEnvVar("SMTP_HOST"),
  port: Number(getEnvVar("SMTP_PORT")),
  auth: {
    user: getEnvVar("SMTP_USER"),
    pass: getEnvVar("SMTP_PASSWORD"),
  },
});

const loadTemplate = (templateName, data) => {
  try {

    const templatePath = path.resolve("src/templates", templateName);
 
    

    const templateSource = fs.readFileSync(templatePath, "utf8");

    const template = Handlebars.compile(templateSource);
    
    return template(data);
  } catch (error) {
    console.error("Error loading email template:", error);
    throw new Error("Email template not found");
  }
};

export const sendEmail = async (to, subject, templateName, templateData) => {
  const html = loadTemplate(templateName, templateData);

  const mailOptions = {
    from: `"Contact App" <${getEnvVar(SMTP_FROM)}>`,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};
