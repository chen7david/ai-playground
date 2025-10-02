export const getFormattedSpellCheckWordlistPrompt = (wordlist: string[]) =>
  `Wordlist: ${JSON.stringify(wordlist)}`;
