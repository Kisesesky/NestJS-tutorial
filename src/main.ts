import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
// import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import * as csurf from 'csurf'
import * as cookie from 'cookie-parser'
import helmet from 'helmet';
import { WinstonLoggersService } from './modules/logger/winston-loggers.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const logger = new WinstonLoggersService()

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  // app.useGlobalGuards(new JwtAuthGuard());
  // app.useGlobalGuards(new LocalAuthGuard());

  const corsOption = {
    allowHeaders: [
      'Accept',
      'Content-Type',
      'Origin',
      'Authorization'
    ],
    origin: [
      'http://localhost:8000',
      'http://localhost:8080',
      'http://0.0.0.0:8000',
      'http://127.0.0.1:8000',
      /^http(s)?:'my-domain'/,
    ],
    credential: true,
  };
  app.enableCors(corsOption)
  app.use(cookie())
  // app.use(csurf({ cookie: true }))
  app.use(helmet())
  app.setGlobalPrefix('/api/v1', {
    exclude: ['health'],
  })

  app.useLogger(logger)

  const port = configService.get<number>('PORT') || 3000;
  logger.log('Application is starting...')
  await app.listen(port);

}
bootstrap();
