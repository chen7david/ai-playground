import { injectable, inject } from "inversify";
import { ConfigService } from "./config.service";
import { GoogleGenAI } from "@google/genai";
import { getFormattedWordlistPrompt } from "../prompts/wordlist/wordlist.prompt.format";
import { WORDLIST_PROMPT_INSTRUCTIONS } from "../prompts/wordlist/wordlist.prompt.instructions";
import { wordListSchema } from "../prompts/wordlist/wordlist.prompt.schema";

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

  async getWordlist(context: string, wordlist: string[]) {
    const userPrompt = getFormattedWordlistPrompt(context, wordlist);

    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: [
        { role: "model", parts: [{ text: WORDLIST_PROMPT_INSTRUCTIONS }] },
        { role: "user", parts: [{ text: userPrompt }] },
      ],
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: wordListSchema,
      },
    });

    let result: any[] = [];
    try {
      const rawText = response.text ?? "";
      const sanitizedText = rawText;
      result = JSON.parse(sanitizedText);
    } catch (e) {
      console.log(e);
      throw new Error("Model did not return valid JSON.");
    }

    return result;
  }
}
