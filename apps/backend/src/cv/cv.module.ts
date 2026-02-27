import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from './domain/user-profile.schema';
import { UserProfileRepository } from './infrastructure/user-profile.repository';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { AiModule } from '../ai/ai.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserProfile.name, schema: UserProfileSchema },
        ]),
        AiModule,
    ],
    controllers: [CvController],
    providers: [CvService, UserProfileRepository],
    exports: [CvService],
})
export class CvModule { }
