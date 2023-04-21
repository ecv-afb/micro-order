import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

export const API_URL = 'http://microservices.tp.rjqu8633.odns.fr/api';
export const SHIPPING_API_URL = 'https://api-shipping-tau.vercel.app/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Commandes example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    ); 
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  }
}
bootstrap();
