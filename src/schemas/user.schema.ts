import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({
        required: true,
        min: 3,
        max: 30,
    })
    username: string

    @Prop({
        required: true,
        unique: true,
    })
    email: string

    @Prop({
        required: true,
        min: 4,
    })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
