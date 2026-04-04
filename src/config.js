export const CONFIG = {
  WEATHER_API_URL: process.env.EXPO_PUBLIC_WEATHER_API_URL || "https://api.openweathermap.org/data/2.5/weather",
  WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY || "",
  LLM_API_URL: process.env.EXPO_PUBLIC_LLM_API_URL || "https://api.example-llm.com/v1",
  LLM_API_KEY: process.env.EXPO_PUBLIC_LLM_API_KEY || "",
  BACKEND_API_URL: process.env.EXPO_PUBLIC_BACKEND_API_URL || "https://api.agrisaarthi.com/v1",
};
