import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from '../environments';

const env = process.env.NODE_ENV || 'development';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: env === 'development',
  logging: env === 'development',
};
