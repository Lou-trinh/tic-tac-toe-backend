// src/game/schemas/game.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  winner: string; // 'X', 'O', or 'Draw'

  @Prop()
  moves: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);