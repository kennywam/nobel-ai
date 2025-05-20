// src/openai/openai.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';

@Controller('ai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('summarize')
  async summarize(@Body('text') text: string) {
    const summary = await this.openAIService.summarizeSymptoms(text);
    return { summary };
  }
}
