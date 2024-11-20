import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes('dev'),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes('test'),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes('prod'),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes('staging'),
  env: process.env.NODE_ENV,
};


export const PORT = configService.get('PORT');
export const DB_HOST = configService.get('DB_HOST');
export const DB_PORT = configService.get('DB_PORT');
export const DB_USERNAME = configService.get('DB_USERNAME');
export const DB_PASSWORD = configService.get('DB_PASSWORD');
export const DB_NAME = configService.get('DB_NAME');
export const DB_URL = configService.get('DB_URL');
