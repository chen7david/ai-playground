import "reflect-metadata";
import { Container } from "inversify";
import { DotenvService } from "./services/dotenv.service";
import { ConfigService } from "./services/config.service";
import { GeminiService } from "./services/gemini.service";

const container = new Container();

// Manually bind the services
container.bind(DotenvService).toSelf();
container.bind(ConfigService).toSelf();
container.bind(GeminiService).toSelf();

// Get the services
const geminiService = container.get(GeminiService);

const prompt = "What is the capital of France?";
const result = geminiService
  .prompt(prompt)
  .then((res) => console.log(res.text));
