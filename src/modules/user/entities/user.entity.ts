import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true
    })
    lastName: string;

    @Prop({ 
        unique: true 
    })
    email: string;
    
    @Prop({
        unique: true,
        index: true
    })
    number: string;
    
    @Prop({
        required: true
    })
    password: string;
    
    @Prop({
        required: true
    })
    age: number
}

export const UserSchema = SchemaFactory.createForClass( User );