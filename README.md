# AI Playground - Gemini Service

A TypeScript service class for interacting with Google's Gemini AI models using the `@google/genai` package.

## Features

- **Content Generation**: Generate text content using various Gemini models
- **Streaming Support**: Real-time streaming of generated content
- **Configurable Parameters**: Customize temperature, token limits, and other generation settings
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Error Handling**: Robust error handling with detailed error messages
- **Token Usage Tracking**: Monitor API usage with token count information

## Installation

The required dependencies are already installed:

```bash
npm install @google/genai
npm install --save-dev @types/node
```

## Setup

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/)
2. Set your API key as an environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

## Usage

### Basic Usage

```typescript
import { GeminiService } from "./services/gemini.service";

const geminiService = new GeminiService({
  apiKey: process.env.GEMINI_API_KEY!,
  model: "gemini-2.0-flash-exp", // Optional
});

// Generate content
const result = await geminiService.generateContent("Explain quantum computing");
console.log(result.text);
console.log("Token usage:", result.usage);
```

### Advanced Usage with Custom Settings

```typescript
const result = await geminiService.generateContent("Write a creative story", {
  temperature: 0.9, // More creative (0.0 - 1.0)
  maxOutputTokens: 1000, // Limit response length
  topP: 0.8, // Nucleus sampling
  topK: 40, // Top-k sampling
});
```

### Streaming Content Generation

```typescript
let fullText = "";
await geminiService.generateContentStream("Tell me a long story", (chunk) => {
  fullText += chunk;
  process.stdout.write(chunk); // Print as it streams
});
```

## API Reference

### GeminiService

#### Constructor

```typescript
constructor(config: GeminiConfig)
```

- `config.apiKey`: Your Gemini API key (required)
- `config.model`: Model name (optional, defaults to 'gemini-2.0-flash-exp')

#### Methods

##### generateContent(prompt, options?)

Generates text content using the configured model.

**Parameters:**

- `prompt: string` - The text prompt to send to the model
- `options?: object` - Optional generation configuration
  - `temperature?: number` - Controls randomness (0.0-1.0, default: 0.7)
  - `maxOutputTokens?: number` - Maximum tokens in response (default: 8192)
  - `topP?: number` - Nucleus sampling parameter (default: 0.8)
  - `topK?: number` - Top-k sampling parameter (default: 40)

**Returns:** `Promise<GenerateContentResponse>`

##### generateContentStream(prompt, onChunk, options?)

Generates content with real-time streaming.

**Parameters:**

- `prompt: string` - The text prompt to send to the model
- `onChunk: (chunk: string) => void` - Callback for each text chunk
- `options?: object` - Same as generateContent options

**Returns:** `Promise<void>`

##### getModelName()

Returns the currently configured model name.

**Returns:** `string`

## Running the Example

```bash
npm run dev
```

This will run the example code in `src/index.ts` which demonstrates:

- Basic content generation
- Custom parameter configuration
- Streaming content generation

## Available Models

- `gemini-2.0-flash-exp` (default) - Latest experimental model
- `gemini-1.5-pro` - High-quality model for complex tasks
- `gemini-1.5-flash` - Fast model for simple tasks

## Error Handling

The service includes comprehensive error handling:

```typescript
try {
  const result = await geminiService.generateContent("Your prompt");
} catch (error) {
  console.error("Generation failed:", error.message);
}
```

Common error scenarios:

- Invalid API key
- Network connectivity issues
- Rate limiting
- Invalid model parameters
- Content policy violations

## Type Definitions

The service exports the following types:

- `GeminiConfig` - Configuration for the service
- `GenerateContentResponse` - Response from content generation
- `GeminiService` - Main service class

## License

ISC


