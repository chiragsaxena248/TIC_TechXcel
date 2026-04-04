// src/services/api.js

const SAMBANOVA_API_KEY = "b65bf930-1fb0-4ad1-84a8-2e0f6470d8dd";
const SAMBANOVA_API_URL = "https://api.sambanova.ai/v1/chat/completions";

const WEATHER_API_KEY = "f8a622574d8d6549b334da93b297f6c7";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// =====================================================
// WEATHER API
// =====================================================
export async function getWeather(lat = null, lon = null, city = null) {
  try {
    let url = "";

    if (lat !== null && lon !== null) {
      url = `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    } else if (city) {
      url = `${WEATHER_BASE_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
    } else {
      url = `${WEATHER_BASE_URL}?q=Bhopal&appid=${WEATHER_API_KEY}&units=metric`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API failed");
    }

    const data = await response.json();

    return {
      city: data?.name || "Unknown",
      temperature: Math.round(data?.main?.temp ?? 0),
      humidity: data?.main?.humidity ?? "--",
      condition: data?.weather?.[0]?.main ?? "Clear",
    };
  } catch (error) {
    console.log("getWeather error:", error);
    return {
      city: "Bhopal",
      temperature: "--",
      humidity: "--",
      condition: "Unavailable",
    };
  }
}

// =====================================================
// CROP RECOMMENDATION
// =====================================================
export async function predictCrop(payload) {
  try {
    const prompt = `
You are an agriculture expert for Indian farmers.

Based on the following farm details, recommend the BEST crop.

Farm Details:
- Land Size: ${payload.landSize}
- City/Area: ${payload.city}
- Season: ${payload.season}
- Water Facility: ${payload.waterFacility}
- Soil Type: ${payload.soilType}
- Demand Crop Preference: ${payload.demandCrop}

Return ONLY valid JSON in this format:
{
  "crop": "Crop Name",
  "confidence": "High / Medium / Low",
  "reason": "Short explanation"
}
`;

    const response = await fetch(SAMBANOVA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SAMBANOVA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "system",
            content: "You are an agriculture crop recommendation assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.log("Crop API Error:", errText);
      throw new Error("Crop API failed");
    }

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content?.trim() || "";

    const parsed = safeParseJSON(rawText);

    return {
      crop: parsed?.crop || "Wheat",
      confidence: parsed?.confidence || "Medium",
      reason: parsed?.reason || "Suitable based on entered conditions.",
    };
  } catch (error) {
    console.log("predictCrop error:", error);
    return {
      crop: "Wheat",
      confidence: "Medium",
      reason: "Fallback response due to API issue.",
    };
  }
}

// =====================================================
// DISEASE DETECTION
// =====================================================
export async function detectDisease(payload) {
  try {
    const prompt = `
You are a crop disease diagnosis assistant for Indian farmers.

Analyze the issue based on:
Crop Name: ${payload.cropName}
Problem Description: ${payload.problemDescription}

Return ONLY valid JSON in this format:
{
  "disease": "Likely Disease Name",
  "confidence": "High / Medium / Low",
  "solution": "Short practical solution"
}
`;

    const response = await fetch(SAMBANOVA_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SAMBANOVA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: [
          {
            role: "system",
            content: "You are a crop disease diagnosis assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.log("Disease API Error:", errText);
      throw new Error("Disease API failed");
    }

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content?.trim() || "";

    const parsed = safeParseJSON(rawText);

    return {
      disease: parsed?.disease || "Possible Leaf Spot",
      confidence: parsed?.confidence || "Medium",
      solution:
        parsed?.solution ||
        "Remove affected leaves and consult local agriculture expert.",
    };
  } catch (error) {
    console.log("detectDisease error:", error);
    return {
      disease: "Possible Leaf Spot",
      confidence: "Medium",
      solution: "Fallback response due to API issue.",
    };
  }
}

// =====================================================
// IRRIGATION ADVISORY
// =====================================================
export async function getIrrigationAdvice(payload) {
  try {
    const weather = await getWeather(null, null, payload.city);

    const temperature = weather.temperature;
    const humidity = weather.humidity;
    const condition = weather.condition;

    let irrigationAdvice = "Water every 2-3 days.";
    let urgency = "Medium";
    let waterSavingTip = "Use drip irrigation to save water.";

    if (
      payload.waterAvailability === "low" ||
      payload.waterSource === "borewell"
    ) {
      irrigationAdvice =
        "Water lightly every 3-4 days, preferably in the early morning.";
      urgency = "Medium";
      waterSavingTip =
        "Use mulching and drip irrigation to reduce evaporation.";
    }

    if (
      typeof temperature === "number" &&
      temperature >= 35 &&
      typeof humidity === "number" &&
      humidity < 45
    ) {
      irrigationAdvice =
        "Water daily or on alternate days in early morning/evening.";
      urgency = "High";
      waterSavingTip =
        "Avoid afternoon irrigation and use mulching to retain moisture.";
    }

    if (
      String(condition).toLowerCase().includes("rain") ||
      String(condition).toLowerCase().includes("drizzle")
    ) {
      irrigationAdvice = "Skip irrigation for now and monitor soil moisture.";
      urgency = "Low";
      waterSavingTip = "Store rainwater and avoid overwatering.";
    }

    return {
      irrigationAdvice,
      waterSavingTip: `${waterSavingTip} (Weather: ${temperature}°C, ${humidity}% humidity, ${condition})`,
      urgency,
      weather,
    };
  } catch (error) {
    console.log("getIrrigationAdvice error:", error);
    return {
      irrigationAdvice: "Water every 2-3 days.",
      waterSavingTip: "Use drip irrigation to save water.",
      urgency: "Medium",
      weather: null,
    };
  }
}

// =====================================================
// SAFE JSON PARSER
// =====================================================
function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]);
      return null;
    } catch {
      return null;
    }
  }
}
