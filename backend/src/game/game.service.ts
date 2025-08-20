// src/game/game.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async create(winner: string, moves: number): Promise<Game> {
    const newGame = new this.gameModel({ winner, moves });
    const savedGame = await newGame.save();

    // Dòng mới được thêm vào
    console.log(
      `Đã lưu kết quả ván đấu: Người thắng là '${savedGame.winner}', số bước đi là ${savedGame.moves}.`,
    );

    return savedGame;
  }
}
