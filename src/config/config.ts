export default () => ({
  port: process.env.APP_PORT,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '7d' },
  },
});
