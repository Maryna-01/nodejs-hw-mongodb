export const getEnvVar = (name) => {
  if (!name) {
    throw new Error(`Missing environment variable name.`);
  }
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }
  return value;
};

