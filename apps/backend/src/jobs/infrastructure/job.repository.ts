import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { JobApplication, JobApplicationDocument } from '../domain/job-application.schema';

@Injectable()
export class JobRepository extends BaseRepository<JobApplicationDocument, string> {
    constructor(
        @InjectModel(JobApplication.name) model: Model<JobApplicationDocument>,
    ) {
        super(model);
    }

    async listJobsSorted(): Promise<JobApplicationDocument[]> {
        return this.find({}, { sort: { createdAt: -1 } });
    }
}
