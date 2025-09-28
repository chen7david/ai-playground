import { Type } from "@google/genai";

export const wordListSchema = {
  description: "Array of vocabulary entries",
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      en: {
        type: Type.STRING,
        description: "English word",
        nullable: false,
      },
      zh: {
        type: Type.STRING,
        description: "Chinese translation of the word",
        nullable: false,
      },
      definition: {
        type: Type.STRING,
        description: "Simple definition of the word",
        nullable: false,
      },
      examples: {
        type: Type.ARRAY,
        description: "Example sentences using the word",
        items: {
          type: Type.STRING,
          description: "Single example sentence",
          nullable: false,
        },
      },
    },
    required: ["en", "zh", "definition", "examples"],
  },
};
