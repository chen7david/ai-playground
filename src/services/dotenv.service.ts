import dotenv from "dotenv";
import { injectable } from "inversify";

@injectable()
export class DotenvService {
  constructor() {}

  loadConfig() {
    return dotenv.config();
  }
}
