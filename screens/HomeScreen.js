import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getWeather } from "../src/services/api";

export default function HomeScreen({ navigation, currentTheme }) {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  const hasFetchedWeather = useRef(false);

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
    if (loadingWeather) return; // prevent duplicate calls

    try {
      setLoadingWeather(true);
      setWeatherError(false);

      let lat = null;
      let lon = null;

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        lat = location.coords.latitude;
        lon = location.coords.longitude;
      }

      const data = await getWeather(lat, lon);

      setWeather({
        city: data.city || "Unknown Location",
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
        condition: t("weather_unavailable") || "Unavailable",
      });
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedWeather.current) {
      hasFetchedWeather.current = true;
      fetchWeather();
    }
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text style={{ fontSize: 16, color: subText, marginTop: 0 }}>
        {t("Hello Farmer!")}
      </Text>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: text,
        }}
      >
        {t("Dashboard")}
      </Text>

      <View
        style={{
          backgroundColor: cardBg,
          padding: 18,
          borderRadius: 18,
          marginBottom: 24,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: text }}>
          🌤 {t("Today's Weather")}
        </Text>

        {loadingWeather ? (
          <View style={{ marginTop: 10 }}>
            <ActivityIndicator size="small" color="#2E7D32" />
            <Text style={{ marginTop: 6, color: subText }}>
              {t("loading_weather") || "Loading weather..."}
            </Text>
          </View>
        ) : (
          <Text style={{ marginTop: 6, color: weatherError ? "red" : subText }}>
            {weather.city} • {weather.temperature}°C • {t("humidity")}{" "}
            {weather.humidity}% • {weather.condition}
          </Text>
        )}

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
            {t("refresh_weather") || "Refresh Weather"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={cardStyle(isDark ? "#1B5E20" : "#E8F5E9")}
        onPress={() => navigation.navigate("CropRecommendation")}
      >
        <Text style={[cardTitle, { color: isDark ? "#fff" : "#111" }]}>
          {t("Crop Recommendation")}
        </Text>
        <Text style={[cardSub, { color: isDark ? "#ddd" : "#666" }]}>
          {t("Crop which you can grow in your field.")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={cardStyle(isDark ? "#E65100" : "#FFF3E0")}
        onPress={() => navigation.navigate("DiseaseDetection")}
      >
        <Text style={[cardTitle, { color: isDark ? "#fff" : "#111" }]}>
          {t("Disease Detection")}
        </Text>
        <Text style={[cardSub, { color: isDark ? "#ddd" : "#666" }]}>
          {t("Check which disease is affecting your crop.")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={cardStyle(isDark ? "#0D47A1" : "#E3F2FD")}
        onPress={() => navigation.navigate("Irrigation")}
      >
        <Text style={[cardTitle, { color: isDark ? "#fff" : "#111" }]}>
          {t("Irrigation Advisory")}
        </Text>
        <Text style={[cardSub, { color: isDark ? "#ddd" : "#666" }]}>
          {t("Get schedule when to water your crops.")}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: text,
          marginTop: 18,
          marginBottom: 12,
        }}
      >
        {t("Quick Access")}
      </Text>

      <TouchableOpacity
        style={[smallBtn, { backgroundColor: cardBg }]}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={[smallBtnText, { color: text }]}>{t("View History")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[smallBtn, { backgroundColor: cardBg }]}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={[smallBtnText, { color: text }]}>
          {t("About Project")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[smallBtn, { backgroundColor: cardBg }]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={[smallBtnText, { color: text }]}>{t("Settings")}</Text>
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
