import { injectable, inject } from "inversify";
import { ConfigService } from "./config.service";
import { GoogleGenAI } from "@google/genai";

@injectable()
export class GeminiService {
  private apiKey: string;
  private model: string;
  private ai: GoogleGenAI;

  constructor(@inject(ConfigService) private configService: ConfigService) {
    this.apiKey = this.configService.getConfig("GEMINI_API_KEY");
    this.model = this.configService.getConfig("GEMINI_MODEL");
    this.ai = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  async prompt(prompt: string) {
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
    });
    return response;
  }
}
