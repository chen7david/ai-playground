export type GeminiConfig = {
  apiKey: string;
  model: string;
};

export class GeminiService {
  constructor({ apiKey, model }: GeminiConfig) {}
}
