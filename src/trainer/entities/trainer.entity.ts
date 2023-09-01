
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Trainer extends Document{
    @Prop({ required: true })
    pokename: string;
}

export const TrainerSchema  = SchemaFactory.createForClass(Trainer);