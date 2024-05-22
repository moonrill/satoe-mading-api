import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

  // Set prefix
  app.setGlobalPrefix('api/v1');

  // Config Service
  const configService = app.get(ConfigService);
  // Set up port
  const port = configService.get('port') || 3000;

  await app.listen(port);

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  Logger.log('Application listening on port ' + port);
}
bootstrap();
