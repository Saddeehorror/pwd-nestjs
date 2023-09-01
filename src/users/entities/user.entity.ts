
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document{
    @Prop({ required: true })
    sub: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    googlename: string;

    @Prop({ default: null })
    username: string;

    @Prop({ default: null })
    picture: string;

    @Prop({ default: false })
    skipintro: boolean;

}


export const UserSchema  = SchemaFactory.createForClass(User);