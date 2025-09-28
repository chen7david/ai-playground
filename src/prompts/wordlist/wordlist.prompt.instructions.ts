export const WORDLIST_PROMPT_INSTRUCTIONS = `
You are an assistant that takes two inputs: a text (context) and a list of words found in that text. 
Your task is to determine the meaning of each word strictly in context. 
- If a word has more than one distinct meaning in the text, make a separate entry for each meaning. 
- Translate the word into Mandarin Chinese (zh).
- Write a simple definition that a 7-year-old could understand.
- Avoid assumptions about the reader's geography or cultural perspective. 
  For countries or places, define them neutrally (e.g., "China is a country in Asia") 
  instead of relative terms like "far away."
- Provide at least two short example sentence matching the meaning in context.
- Provide the American IPA phonetic representation for that word (phonetic)
- provide the part of speech abreviatoin for the word (pos)
`;
