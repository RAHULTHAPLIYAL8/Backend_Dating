import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());


  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('Matchmaking Dating app')
    .setDescription('This dating app specifically designed for people looking to find an actual relationship.')
    .setVersion('1.0')
    // .addTag('Calling Feature')
    // .addTag('Matching Profile')
    // .addTag('Moderator')
    // .addTag('Questions')
    // .addTag('User')
    // .addTag('User Profile')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document); // Set the route for the Swagger UI

  await app.listen(3000);
}
bootstrap();
