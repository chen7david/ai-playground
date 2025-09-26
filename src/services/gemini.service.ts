import { injectable, inject } from "inversify";
import { ConfigService } from "./config.service";

@injectable()
export class GeminiService {
  private apiKey: string;
  private model: string;

  constructor(@inject(ConfigService) private configService: ConfigService) {
    this.apiKey = this.configService.getConfig("GEMINI_API_KEY");
    this.model = this.configService.getConfig("GEMINI_MODEL");
  }
}
