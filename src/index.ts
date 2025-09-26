import { GeminiService } from "./services/gemini.service";

const geminiService = new GeminiService({
  apiKey: process.env.GEMINI_API_KEY!,
  model: "gemini-2.0-flash-exp",
});
