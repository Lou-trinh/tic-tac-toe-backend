import { Document } from 'mongoose';
export type GameDocument = Game & Document;
export declare class Game {
    winner: string;
    moves: number;
    date: Date;
}
export declare const GameSchema: import("mongoose").Schema<Game, import("mongoose").Model<Game, any, any, any, Document<unknown, any, Game, any, {}> & Game & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Game, Document<unknown, {}, import("mongoose").FlatRecord<Game>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Game> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
