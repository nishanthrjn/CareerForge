// Purpose: Configures and exports the MongoDB connection.
// apps/backend/src/shared/mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Only include this if it's NOT already in AppModule globally
    // ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri:
          config.get<string>('mongoUri') ??
          'mongodb://localhost:27017/cv-cover-tailor',
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
