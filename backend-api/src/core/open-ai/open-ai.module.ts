import { Module } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
import { OpenAIController } from './open-ai.controller';

@Module({
  controllers: [OpenAIController],
  providers: [OpenAIService],
})
export class OpenAiModule {}
