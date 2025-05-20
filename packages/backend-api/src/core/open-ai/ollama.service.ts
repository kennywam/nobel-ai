import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

// Define interfaces for Ollama API responses
interface OllamaResponse {
  response?: string;
  error?: string;
}

@Injectable()
export class OllamaService {
  private readonly ollamaUrl: string;
  private readonly model: string;

  constructor() {
    this.ollamaUrl = 
      process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
    this.model = process.env.OLLAMA_MODEL || 'llama3';
  }

  async summarizeSymptoms(userInput: string): Promise<string> {
    try {
      const systemPrompt = `
You are a helpful and cautious medical assistant AI.
Your goal is to help patients prepare a concise, clear symptom summary they can show their doctor. You must not make diagnoses. Just summarize what the user is experiencing.

Follow this structure:
1. Main complaint or symptom
2. Any medications recently taken
3. Timeline (when it started, how it's changed)
4. Any related symptoms or lack of them (e.g., no fever)
5. Specific concern (if mentioned)

Be brief, medically accurate, and user-friendly.
      `.trim();

      const fullPrompt = `${systemPrompt}\n\nUser symptoms: ${userInput}\n\nSummary:`;

      const response: AxiosResponse<OllamaResponse> = await axios.post(
        this.ollamaUrl,
        {
          model: this.model,
          prompt: fullPrompt,
          stream: false,
          options: {
            temperature: 0.5, // optional: reduce hallucinations
          },
        }
      );

      // Check if we have a valid response
      if (response.data?.response) {
        return response.data.response.trim();
      }

      // If no valid response, throw an error with any error message from Ollama
      throw new Error(response.data?.error || 'No valid response from Ollama');
    } catch (error) {
      console.error('Error calling Ollama:', error);

      // Handle specific error cases
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.code === 'ECONNREFUSED') {
          throw new Error(
            'Could not connect to Ollama. Ensure it is running locally. Install from https://ollama.com.'
          );
        }

        // Extract error message from response if available
        const responseData = axiosError.response?.data as OllamaResponse | undefined;
        const errorMessage = responseData?.error || axiosError.message;
        throw new Error(`Ollama error: ${errorMessage}`);
      }

      // For any other type of error
      throw new Error(
        'Failed to generate summary. Please try again later or check Ollama installation.'
      );
    }
  }
}
