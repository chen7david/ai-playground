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

const wordlist = [
  "plants",
  "flowers",
  "water",
  "China",
  "color",
  "prestigigotation",
];
const context =
  "Plants are green and flowers are red. Water is wet. China is a country. The boy waters the plants.";
const result = geminiService
  // .spellCheck(wordlist)
  .getWordlist(context, wordlist)
  .then((res) => console.log(res));
// const result = geminiService
//   .prompt(prompt)
//   .then((res) => console.log(res.text));
