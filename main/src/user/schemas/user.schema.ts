// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 0 })
  like: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
