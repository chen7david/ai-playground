import { configSchema, Config } from "../config/config.schema";

export class ConfigService {
  private config: Config;

  constructor() {
    this.config = configSchema.parse(process.env);
  }
}
