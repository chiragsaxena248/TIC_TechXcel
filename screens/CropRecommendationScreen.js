import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CropRecommendationScreen({ currentTheme }) {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  const [landSize, setLandSize] = useState("");
  const [city, setCity] = useState("");
  const [season, setSeason] = useState("");
  const [waterFacility, setWaterFacility] = useState("");
  const [soilType, setSoilType] = useState("");
  const [demandCrop, setDemandCrop] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (
      !landSize ||
      !city ||
      !season ||
      !waterFacility ||
      !soilType ||
      !demandCrop
    ) {
      Alert.alert(t("missing_fields"), t("fill_all_fields"));
      return;
    }

    try {
      setLoading(true);

      // 🔥 API CALL STARTS HERE
      const response = await fetch("YOUR_API_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          landSize: Number(landSize),
          city: city.trim(),
          season,
          waterFacility,
          soilType,
          demandCrop,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // Expected backend response format:
      // {
      //   crop: "Wheat",
      //   confidence: "90%",
      //   reason: "Suitable due to soil and season"
      // }

      setResult({
        crop: data.crop,
        confidence: data.confidence || "N/A",
        reason: data.reason || "",
      });
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to fetch recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDark ? "#121212" : "#F8FAF7" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={[styles.title, { color: isDark ? "#81C784" : "#1B5E20" }]}>
        🌱 {t("crop_recommendation")}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#bbb" : "#666" }]}>
        {t("crop_recommendation_sub")}
      </Text>

      <InputField
        label={t("land_size")}
        value={landSize}
        onChangeText={setLandSize}
        keyboardType="numeric"
        isDark={isDark}
      />

      <InputField
        label={t("city_area")}
        value={city}
        onChangeText={setCity}
        isDark={isDark}
      />

      <Text style={[styles.label, { color: isDark ? "#ddd" : "#333" }]}>
        {t("season_question")}
      </Text>
      <View
        style={[
          styles.pickerWrapper,
          { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
        ]}
      >
        <Picker
          selectedValue={season}
          onValueChange={setSeason}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label={t("select_season")} value="" />
          <Picker.Item label={t("kharif")} value="kharif" />
          <Picker.Item label={t("rabi")} value="rabi" />
          <Picker.Item label={t("zaid")} value="zaid" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: isDark ? "#ddd" : "#333" }]}>
        {t("water_facility")}
      </Text>
      <View
        style={[
          styles.pickerWrapper,
          { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
        ]}
      >
        <Picker
          selectedValue={waterFacility}
          onValueChange={setWaterFacility}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label={t("select_water_availability")} value="" />
          <Picker.Item label={t("below_average")} value="below_average" />
          <Picker.Item label={t("average")} value="average" />
          <Picker.Item label={t("above_average")} value="above_average" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: isDark ? "#ddd" : "#333" }]}>
        {t("soil_type")}
      </Text>
      <View
        style={[
          styles.pickerWrapper,
          { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
        ]}
      >
        <Picker
          selectedValue={soilType}
          onValueChange={setSoilType}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label={t("select_soil_type")} value="" />
          <Picker.Item label={t("black_soil")} value="black" />
          <Picker.Item label={t("red_soil")} value="red" />
          <Picker.Item label={t("alluvial_soil")} value="alluvial" />
          <Picker.Item label={t("sandy_soil")} value="sandy" />
          <Picker.Item label={t("clay_soil")} value="clay" />
          <Picker.Item label={t("loamy_soil")} value="loamy" />
        </Picker>
      </View>

      <InputField
        label={t("demand_crop")}
        value={demandCrop}
        onChangeText={setDemandCrop}
        isDark={isDark}
      />

      <TouchableOpacity style={styles.button} onPress={handlePredict}>
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : t("get_recommendation")}
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>🌾 {t("recommended_crop")}</Text>
          <Text style={styles.resultCrop}>{result.crop}</Text>
          <Text style={styles.resultConfidence}>
            {t("confidence")}: {result.confidence}
          </Text>
          <Text style={styles.resultReason}>{result.reason}</Text>
        </View>
      )}
    </ScrollView>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  isDark,
}) {
  const { t } = useTranslation();

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={[styles.label, { color: isDark ? "#ddd" : "#333" }]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "white",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#DDE5DD",
          },
        ]}
        placeholder={`${t("enter")} ${label}`}
        placeholderTextColor={isDark ? "#888" : "#999"}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = {
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  pickerWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDE5DD",
    marginBottom: 18,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1B5E20",
  },
  resultCrop: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 6,
  },
  resultConfidence: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  resultReason: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
  },
};
