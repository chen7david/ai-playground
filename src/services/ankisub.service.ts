import { injectable } from "inversify";
import { ConfigService } from "./config.service";
import { GoogleGenAI } from "@google/genai";
import { getFormattedWordlistPrompt } from "../prompts/wordlist/wordlist.prompt.format";
import { WORDLIST_PROMPT_INSTRUCTIONS } from "../prompts/wordlist/wordlist.prompt.instructions";
import { wordListSchema } from "../prompts/wordlist/wordlist.prompt.schema";
import { getFormattedSpellCheckWordlistPrompt } from "../prompts/spellcheck/spellcheck.prompt.format";
import { SPELLCHECK_PROMPT_INSTRUCTIONS } from "../prompts/spellcheck/spellcheck.prompt.instructions";
import { spellCheckSchema } from "../prompts/spellcheck/spellcheck.prompt.schema";

@injectable()
export class AnkiSubService {
  private apiKey: string;
  private model: string;
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.getConfig("GEMINI_API_KEY");
    this.model = this.configService.getConfig("GEMINI_MODEL");
    this.ai = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  async subtitleToTranslatedCSV(context: string, wordlist: string[]) {
    const response = await this.ai.models.generateContent({
      model: this.model,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: wordListSchema,
      },
      contents: [
        { role: "model", parts: [{ text: WORDLIST_PROMPT_INSTRUCTIONS }] },
        {
          role: "user",
          parts: [{ text: getFormattedWordlistPrompt(context, wordlist) }],
        },
      ],
    });

    let result: any[] = [];
    try {
      const rawText = response.text ?? "";
      result = JSON.parse(rawText);
    } catch (e) {
      throw new Error("Model did not return valid JSON.");
    }

    return result;
  }
}
