import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateUuidPipe } from './common/pipes/parse-uuid.pipe';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Team Manager')
    .setDescription('The Team Manager API description')
    .setVersion('1.0')
    .addTag('team')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
}), new ValidateUuidPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
