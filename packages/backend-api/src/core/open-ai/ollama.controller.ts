import { Controller, Post, Body } from '@nestjs/common';
import { OllamaService } from './ollama.service';

@Controller('ai')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('summarize')
  async summarize(@Body('text') text: string) {
    const summary = await this.ollamaService.summarizeSymptoms(text);
    return { summary };
  }
}
