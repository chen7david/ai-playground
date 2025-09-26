import { z } from "zod";

export const configSchema = z.object({
  GEMINI_API_KEY: z.string(),
  GEMINI_MODEL: z.string(),
});

export type Config = z.infer<typeof configSchema>;
