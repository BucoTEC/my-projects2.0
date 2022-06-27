import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  desc: number;

  @Prop()
  cat: string;

  @Prop()
  url: string;

  @Prop()
  img: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
