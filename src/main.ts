import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger/swagger.config';

// Hot Module Replacement
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Setup Swagger Documentation
  setupSwagger(app);

  // Set prefix
  app.setGlobalPrefix('api/v1');

  // Set up port
  const port = process.env.APP_PORT || 3000;

  await app.listen(port);

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  Logger.log('Application listening on port ' + port);
}
bootstrap();
