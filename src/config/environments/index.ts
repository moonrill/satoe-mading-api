import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
const envFilePath = path.resolve(__dirname, '../../../', envFile);

if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  throw new Error(`Environment file ${envFile} not found. Please create it.`);
}

export default {
  port: parseInt(process.env.APP_PORT, 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
