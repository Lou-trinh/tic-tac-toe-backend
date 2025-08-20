import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';
export declare class GameService {
    private gameModel;
    constructor(gameModel: Model<GameDocument>);
    create(winner: string, moves: number): Promise<Game>;
}
