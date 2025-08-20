// src/game/game.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async create(@Body() gameData: { winner: string; moves: number }): Promise<Game> {
    return this.gameService.create(gameData.winner, gameData.moves);
  }
}