export const getFormattedWordlistPrompt = (
  context: string,
  wordlist: string[]
) => `
  Context: """${context}"""
  Wordlist: ${JSON.stringify(wordlist)}
  `;
