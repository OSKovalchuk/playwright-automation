import dotenv from 'dotenv';
import path from 'path';
//texst

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://qauto.forstudy.space',
  HTTP_USER: process.env.HTTP_USER || 'guest',
  HTTP_PASSWORD: process.env.HTTP_PASSWORD || 'welcome2qauto',
};