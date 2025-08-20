import { GameService } from './game.service';
import { Game } from './schemas/game.schema';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    create(gameData: {
        winner: string;
        moves: number;
    }): Promise<Game>;
}
