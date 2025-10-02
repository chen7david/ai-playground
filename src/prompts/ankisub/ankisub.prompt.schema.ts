import { Type } from "@google/genai";

export const subtitleTranslationSchema = {
  description:
    "CSV string containing subtitle pairs of English and translated lines",
  type: Type.OBJECT,
  properties: {
    csv: {
      type: Type.STRING,
      description:
        "The entire CSV as a single string. Each line has: English subtitle,Translated subtitle",
      nullable: false,
    },
  },
  required: ["csv"],
};
