import { Type } from "@google/genai";

export const spellCheckSchema = {
  description: "Array of misspelled words with suggested corrections",
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      word: {
        type: Type.STRING,
        description: "The word as it was originally provided",
        nullable: false,
      },
      options: {
        type: Type.ARRAY,
        description: "List of suggested correct spellings for the word",
        items: {
          type: Type.STRING,
          description: "Single suggested spelling",
          nullable: false,
        },
      },
    },
    required: ["word", "options"],
  },
};
