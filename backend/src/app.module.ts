import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo:ptsLBPFBYyJSCnYzYiCbdEXRZnaCCTbJ@interchange.proxy.rlwy.net:56602',
    ),
    GameModule, // Keep 'GameModule' here to make it part of the application
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
