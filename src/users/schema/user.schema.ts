import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String, default: 'User' })
  profile: string;

  @Prop({ type: now() })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
