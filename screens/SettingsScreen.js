import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import i18n from "../i18n"; // ✅ FIXED (IMPORTANT)

export default function SettingsScreen() {
  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedTheme, setSelectedTheme] = useState("system");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      const savedTheme = await AsyncStorage.getItem("appTheme");

      if (savedLang) {
        setSelectedLanguage(savedLang);
        i18n.changeLanguage(savedLang); // ✅ apply on load
      }

      if (savedTheme) {
        setSelectedTheme(savedTheme);
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    }
  };

  const handleLanguageChange = async (lang) => {
    try {
      if (lang === selectedLanguage) return;

      setSelectedLanguage(lang);
      await AsyncStorage.setItem("appLanguage", lang);

      await i18n.changeLanguage(lang); // ✅ THIS IS KEY

      Alert.alert("Success", "Language updated successfully!");
    } catch (error) {
      console.log("Language update error:", error);
      Alert.alert("Error", "Failed to change language.");
    }
  };

  const handleThemeChange = async (theme) => {
    try {
      setSelectedTheme(theme);
      await AsyncStorage.setItem("appTheme", theme);

      Alert.alert("Theme Saved", "Theme preference saved successfully.");
    } catch (error) {
      console.log("Theme update error:", error);
      Alert.alert("Error", "Failed to save theme.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>⚙ {t("settings")}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>🌍 {t("language")}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handleLanguageChange(itemValue)}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिन्दी" value="hi" />
            <Picker.Item label="मराठी" value="mr" />
            <Picker.Item label="ಕನ್ನಡ" value="kn" />
          </Picker>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🎨 {t("theme")}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue) => handleThemeChange(itemValue)}
          >
            <Picker.Item label="System Default" value="system" />
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
          </Picker>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>ℹ {t("app_info")}</Text>
        <Text style={styles.infoText}>App Name: AgriSaarthi AI</Text>
        <Text style={styles.infoText}>Version: 1.0.1</Text>
        <Text style={styles.infoText}>Developer: Team TechXcel</Text>
      </View>
    </ScrollView>
  );
}
