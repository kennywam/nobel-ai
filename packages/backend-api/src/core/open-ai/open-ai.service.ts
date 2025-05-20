import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/chat';

@Injectable()
export class OpenAIService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async summarizeSymptoms(userInput: string): Promise<string> {
    const systemMessage: ChatCompletionSystemMessageParam = {
      role: 'system',
      content: `You are a helpful and cautious medical assistant AI.
Your goal is to help patients prepare a concise, clear symptom summary they can show their doctor. You must not make diagnoses. Just summarize what the user is experiencing.

Follow this structure:
1. Main complaint or symptom
2. Any medications recently taken
3. Timeline (when it started, how it's changed)
4. Any related symptoms or lack of them (e.g., no fever)
5. Specific concern (if mentioned)

Be brief, medically accurate, and user-friendly.`,
    };

    const userMessage: ChatCompletionUserMessageParam = {
      role: 'user',
      content: userInput,
    };

    const res = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, userMessage],
      temperature: 0.3,
    });

    return res.choices[0].message.content?.trim() ?? '';
  }
}
