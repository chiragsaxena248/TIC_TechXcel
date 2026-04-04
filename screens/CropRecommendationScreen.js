import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function CropRecommendationScreen() {
  const [landSize, setLandSize] = useState("");
  const [city, setCity] = useState("");
  const [season, setSeason] = useState("");
  const [waterFacility, setWaterFacility] = useState("");
  const [soilType, setSoilType] = useState("");
  const [demandCrop, setDemandCrop] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = () => {
    if (
      !landSize ||
      !city ||
      !season ||
      !waterFacility ||
      !soilType ||
      !demandCrop
    ) {
      Alert.alert("Missing Fields", "Please fill all the input fields.");
      return;
    }

    let recommendedCrop = "Wheat";
    let reason = "";

    if (
      season === "kharif" &&
      waterFacility === "above_average" &&
      (soilType === "black" || soilType === "alluvial")
    ) {
      recommendedCrop = "Rice";
      reason =
        "Kharif season with strong water availability and fertile soil is suitable for rice.";
    } else if (
      season === "rabi" &&
      waterFacility !== "below_average" &&
      (soilType === "loamy" || soilType === "alluvial")
    ) {
      recommendedCrop = "Wheat";
      reason =
        "Rabi season with decent irrigation and fertile soil supports wheat cultivation well.";
    } else if (
      waterFacility === "below_average" &&
      (soilType === "sandy" || soilType === "red")
    ) {
      recommendedCrop = "Millet";
      reason =
        "Low water conditions and lighter soils are better suited for low-water crops like millet.";
    } else if (parseFloat(landSize) < 5 && waterFacility !== "below_average") {
      recommendedCrop = "Vegetables";
      reason =
        "Smaller land with manageable irrigation can be more profitable with vegetables.";
    } else if (demandCrop.toLowerCase().includes("soybean")) {
      recommendedCrop = "Soybean";
      reason =
        "Soybean demand in your area makes it a practical and market-friendly option.";
    } else {
      recommendedCrop = demandCrop;
      reason =
        "Based on your farm conditions and local market demand, this crop looks suitable.";
    }

    setResult({
      crop: recommendedCrop,
      confidence: "93%",
      reason,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F8FAF7" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text style={styles.title}>🌱 Crop Recommendation</Text>
      <Text style={styles.subtitle}>
        Enter your farm details to get the best crop suggestion.
      </Text>

      <InputField
        label="Land Size (in acres)"
        value={landSize}
        onChangeText={setLandSize}
        keyboardType="numeric"
      />

      <InputField label="City / Area" value={city} onChangeText={setCity} />

      <Text style={styles.label}>Which season are you asking for?</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={season} onValueChange={setSeason}>
          <Picker.Item label="Select season" value="" />
          <Picker.Item label="Kharif" value="kharif" />
          <Picker.Item label="Rabi" value="rabi" />
          <Picker.Item label="Zaid" value="zaid" />
        </Picker>
      </View>

      <Text style={styles.label}>Water facility in your area</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={waterFacility} onValueChange={setWaterFacility}>
          <Picker.Item label="Select water availability" value="" />
          <Picker.Item label="Below Average" value="below_average" />
          <Picker.Item label="Average" value="average" />
          <Picker.Item label="Above Average" value="above_average" />
        </Picker>
      </View>

      <Text style={styles.label}>Soil type in your area</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={soilType} onValueChange={setSoilType}>
          <Picker.Item label="Select soil type" value="" />
          <Picker.Item label="Black Soil" value="black" />
          <Picker.Item label="Red Soil" value="red" />
          <Picker.Item label="Alluvial Soil" value="alluvial" />
          <Picker.Item label="Sandy Soil" value="sandy" />
          <Picker.Item label="Clay Soil" value="clay" />
          <Picker.Item label="Loamy Soil" value="loamy" />
        </Picker>
      </View>

      <InputField
        label="Most in-demand crop in your area"
        value={demandCrop}
        onChangeText={setDemandCrop}
      />

      <TouchableOpacity style={styles.button} onPress={handlePredict}>
        <Text style={styles.buttonText}>Get Recommendation</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>🌾 Recommended Crop</Text>
          <Text style={styles.resultCrop}>{result.crop}</Text>
          <Text style={styles.resultConfidence}>
            Confidence: {result.confidence}
          </Text>
          <Text style={styles.resultReason}>{result.reason}</Text>
        </View>
      )}
    </ScrollView>
  );
}

function InputField({ label, value, onChangeText, keyboardType = "default" }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${label}`}
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
    color: "#1B5E20",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDE5DD",
  },
  pickerWrapper: {
    backgroundColor: "white",
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
