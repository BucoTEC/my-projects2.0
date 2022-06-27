import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  desc: number;

  @Prop({
    required: true,
  })
  cat: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop({
    required: true,
  })
  img: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
