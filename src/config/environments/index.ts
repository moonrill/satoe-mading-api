export default () => ({
  port: parseInt(process.env.APP_PORT, 10),
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
  },
});
