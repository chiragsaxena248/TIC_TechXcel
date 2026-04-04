import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen({ navigation, currentTheme }) {
  const { t } = useTranslation();

  // ✅ Real dark mode support
  const isDark = currentTheme === "dark";

  // ✅ Safe default weather state
  const [weather, setWeather] = useState({
    city: "Bhopal",
    temperature: "--",
    humidity: "--",
    condition: "Tap refresh",
  });

  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(false);

  const bg = isDark ? "#121212" : "#F8FAF7";
  const cardBg = isDark ? "#1E1E1E" : "#ffffff";
  const text = isDark ? "#ffffff" : "#111111";
  const subText = isDark ? "#bbbbbb" : "#666666";

  const fetchWeather = async () => {
    try {
      setLoadingWeather(true);
      setWeatherError(false);

      // ⚠️ Replace this later with your real backend API
      const response = await fetch("YOUR_WEATHER_API_URL_HERE");

      if (!response.ok) {
        throw new Error("Weather API failed");
      }

      const data = await response.json();

      setWeather({
        city: data.city || "Bhopal",
        temperature: data.temperature || "--",
        humidity: data.humidity || "--",
        condition: data.condition || "N/A",
      });
    } catch (error) {
      console.log("Weather API Error:", error);
      setWeatherError(true);

      setWeather({
        city: "Bhopal",
        temperature: "--",
        humidity: "--",
        condition: "Unavailable",
      });
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text style={{ fontSize: 16, color: subText, marginTop: 10 }}>
        {t("hello_farmer")}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: text,
        }}
      >
        {t("dashboard_title")}
      </Text>

      {/* WEATHER CARD */}
      <View
        style={{
          backgroundColor: cardBg,
          padding: 18,
          borderRadius: 18,
          marginBottom: 24,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: text }}>
          🌤 {t("today_weather")}
        </Text>

        {loadingWeather ? (
          <View style={{ marginTop: 10 }}>
            <ActivityIndicator size="small" color="#2E7D32" />
            <Text style={{ marginTop: 6, color: subText }}>
              Loading weather...
            </Text>
          </View>
        ) : (
          <Text style={{ marginTop: 6, color: weatherError ? "red" : subText }}>
            {weather.city} • {weather.temperature}°C • Humidity{" "}
            {weather.humidity}% • {weather.condition}
          </Text>
        )}

        {/* Refresh Weather Button */}
        <TouchableOpacity
          style={{
            marginTop: 12,
            backgroundColor: "#2E7D32",
            paddingVertical: 10,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={fetchWeather}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Refresh Weather
          </Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CARDS */}
      <TouchableOpacity
        style={cardStyle(isDark ? "#1B5E20" : "#E8F5E9")}
        onPress={() => navigation.navigate("CropRecommendation")}
      >
        <Text style={[cardTitle, { color: isDark ? "#fff" : "#111" }]}>
          🌱 {t("crop_recommendation")}
        </Text>
        <Text style={[cardSub, { color: isDark ? "#ddd" : "#666" }]}>
          {t("crop_recommendation_desc")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={cardStyle(isDark ? "#E65100" : "#FFF3E0")}
        onPress={() => navigation.navigate("DiseaseDetection")}
      >
        <Text style={[cardTitle, { color: isDark ? "#fff" : "#111" }]}>
          🍃 {t("disease_detection")}
        </Text>
        <Text style={[cardSub, { color: isDark ? "#ddd" : "#666" }]}>
          {t("disease_detection_desc")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={cardStyle(isDark ? "#0D47A1" : "#E3F2FD")}
        onPress={() => navigation.navigate("Irrigation")}
      >
        <Text style={[cardTitle, { color: isDark ? "#fff" : "#111" }]}>
          💧 {t("irrigation_advisory")}
        </Text>
        <Text style={[cardSub, { color: isDark ? "#ddd" : "#666" }]}>
          {t("irrigation_desc")}
        </Text>
      </TouchableOpacity>

      {/* QUICK ACCESS */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: text,
          marginTop: 18,
          marginBottom: 12,
        }}
      >
        {t("quick_access")}
      </Text>

      <TouchableOpacity
        style={[smallBtn, { backgroundColor: cardBg }]}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={[smallBtnText, { color: text }]}>
          📜 {t("view_history")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[smallBtn, { backgroundColor: cardBg }]}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={[smallBtnText, { color: text }]}>
          ℹ {t("about_project")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[smallBtn, { backgroundColor: cardBg }]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={[smallBtnText, { color: text }]}>⚙ {t("settings")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const cardStyle = (bg) => ({
  backgroundColor: bg,
  padding: 18,
  borderRadius: 20,
  marginBottom: 18,
});

const cardTitle = {
  fontSize: 18,
  fontWeight: "bold",
};

const cardSub = {
  fontSize: 14,
  marginTop: 4,
};

const smallBtn = {
  padding: 16,
  borderRadius: 14,
  marginTop: 12,
};

const smallBtnText = {
  fontSize: 16,
  fontWeight: "600",
};
