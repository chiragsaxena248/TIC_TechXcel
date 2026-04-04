import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function IrrigationScreen({ currentTheme }) {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  const [landSize, setLandSize] = useState("");
  const [city, setCity] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [waterAvailability, setWaterAvailability] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [otherWaterUse, setOtherWaterUse] = useState("");

  const handleSubmit = () => {
    if (
      !landSize ||
      city.trim() === "" ||
      !selectedCrop ||
      !waterAvailability ||
      !waterSource ||
      otherWaterUse.trim() === ""
    ) {
      Alert.alert(t("missing_input"), t("fill_all_fields"));
      return;
    }

    const payload = {
      landSize: landSize.trim(),
      city: city.trim(),
      crop: selectedCrop,
      waterAvailability,
      waterSource,
      otherWaterUse: otherWaterUse.trim(),
    };

    console.log("Irrigation Input:", payload);

    Alert.alert(
      t("input_submitted"),
      `${t("land_size")}: ${landSize} acres\n${t("city_area")}: ${city}\n${t("crop_name")}: ${selectedCrop}\n${t("water_availability")}: ${waterAvailability}\n${t("water_source")}: ${waterSource}\n${t("other_water_use")}: ${otherWaterUse}`,
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f4fff3" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#81C784" : "#1b5e20" }]}>
        {t("irrigation_advisory")}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#bbb" : "#4e6e50" }]}>
        {t("irrigation_sub")}
      </Text>

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2e7d32" }]}>
        {t("land_size")}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#a5d6a7",
          },
        ]}
        placeholder={t("land_size_placeholder")}
        placeholderTextColor={isDark ? "#888" : "#999"}
        keyboardType="numeric"
        value={landSize}
        onChangeText={setLandSize}
      />

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2e7d32" }]}>
        {t("city_area")}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#a5d6a7",
          },
        ]}
        placeholder={t("city_placeholder")}
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={city}
        onChangeText={setCity}
      />

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2e7d32" }]}>
        {t("crop_name")}
      </Text>
      <View
        style={[
          styles.pickerWrapper,
          { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
        ]}
      >
        <Picker
          selectedValue={selectedCrop}
          onValueChange={setSelectedCrop}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label={t("select_crop")} value="" />
          <Picker.Item label={t("wheat")} value="wheat" />
          <Picker.Item label={t("rice")} value="rice" />
          <Picker.Item label={t("soybean")} value="soybean" />
          <Picker.Item label={t("cotton")} value="cotton" />
          <Picker.Item label={t("maize")} value="maize" />
          <Picker.Item label={t("sugarcane")} value="sugarcane" />
          <Picker.Item label={t("tomato")} value="tomato" />
          <Picker.Item label={t("potato")} value="potato" />
          <Picker.Item label={t("onion")} value="onion" />
          <Picker.Item label={t("chilli")} value="chilli" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2e7d32" }]}>
        {t("water_availability")}
      </Text>
      <View
        style={[
          styles.pickerWrapper,
          { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
        ]}
      >
        <Picker
          selectedValue={waterAvailability}
          onValueChange={setWaterAvailability}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label={t("select_water_availability")} value="" />
          <Picker.Item label={t("low")} value="low" />
          <Picker.Item label={t("medium")} value="medium" />
          <Picker.Item label={t("high")} value="high" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2e7d32" }]}>
        {t("water_source")}
      </Text>
      <View
        style={[
          styles.pickerWrapper,
          { backgroundColor: isDark ? "#1E1E1E" : "#fff" },
        ]}
      >
        <Picker
          selectedValue={waterSource}
          onValueChange={setWaterSource}
          style={{ color: isDark ? "#fff" : "#000" }}
        >
          <Picker.Item label={t("select_water_source")} value="" />
          <Picker.Item label={t("borewell")} value="borewell" />
          <Picker.Item label={t("canal")} value="canal" />
          <Picker.Item label={t("rainwater")} value="rainwater" />
          <Picker.Item label={t("river")} value="river" />
          <Picker.Item label={t("tank_pond")} value="tank_pond" />
        </Picker>
      </View>

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2e7d32" }]}>
        {t("other_water_use")}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#a5d6a7",
          },
        ]}
        placeholder={t("other_water_use_placeholder")}
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={otherWaterUse}
        onChangeText={setOtherWaterUse}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{t("submit")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 25,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#a5d6a7",
    borderRadius: 12,
    marginBottom: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#1b5e20",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
