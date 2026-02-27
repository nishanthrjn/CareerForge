import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { UserProfile, UserProfileDocument } from '../domain/user-profile.schema';

@Injectable()
export class UserProfileRepository extends BaseRepository<UserProfileDocument, string> {
    constructor(
        @InjectModel(UserProfile.name) model: Model<UserProfileDocument>,
    ) {
        super(model);
    }
}
