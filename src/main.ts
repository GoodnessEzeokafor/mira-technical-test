import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './shared';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        // Map over the errors and extract the messages
        const messages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );
        // Join all messages into a single string
        const errorMessage = messages.join('. ');
        // Throw a BadRequestException with the combined error message
        throw new BadRequestException(`Validation failed: ${errorMessage}`);
      },
      stopAtFirstError: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(PORT || 3000).then(() => console.log(`Running on PORT ${PORT}`));
}
bootstrap();
