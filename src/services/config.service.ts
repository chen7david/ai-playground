import { configSchema, Config } from "../config/config.schema";
import { injectable } from "inversify";
import { DotenvService } from "./dotenv.service";

@injectable()
export class ConfigService {
  private config: Config;

  constructor(dotenvService: DotenvService) {
    dotenvService.loadConfig();
    this.config = configSchema.parse(process.env);
  }

  getConfig(key: keyof Config) {
    return this.config[key];
  }
}
