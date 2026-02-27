import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserProfileDocument = UserProfile & Document;

@Schema()
class ExperienceItem {
    @Prop() role!: string;
    @Prop() company!: string;
    @Prop() duration!: string;
    @Prop([String]) bullets!: string[];
}

@Schema()
class EducationItem {
    @Prop() degree!: string;
    @Prop() institution!: string;
    @Prop() year!: string;
}

@Schema({ timestamps: true })
export class UserProfile {
    @Prop() summary!: string;
    @Prop([String]) skills!: string[];
    @Prop([{ type: ExperienceItem }]) experience!: ExperienceItem[];
    @Prop([{ type: EducationItem }]) education!: EducationItem[];
    @Prop() rawParsedText?: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
