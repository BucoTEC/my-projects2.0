import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  desc: string;

  @Prop({
    required: true,
  })
  cat: string;

  @Prop()
  url: string;

  @Prop()
  img: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
