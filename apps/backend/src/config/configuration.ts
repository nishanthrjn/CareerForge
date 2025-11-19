// Purpose: Central place for environment-driven configuration.

// apps/backend/src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://mongo:27017/cv-tailor',
  llmProvider: process.env.LLM_PROVIDER ?? 'openai', // 'gemini' | 'deepseek'
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  deepseekApiKey: process.env.DEEPSEEK_API_KEY ?? '',
});
