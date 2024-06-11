import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: '.env.development' }); // Load environment variables from .env file

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false, // Ensure this is false for production
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
