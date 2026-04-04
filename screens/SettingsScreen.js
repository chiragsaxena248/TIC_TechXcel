import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen({ currentTheme, setTheme }) {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || "system");

  const isDark = selectedTheme === "dark";

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      const savedTheme = await AsyncStorage.getItem("appTheme");

      if (savedLang) {
        setSelectedLanguage(savedLang);
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
      await i18n.changeLanguage(lang);

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

      if (setTheme) {
        setTheme(theme);
      }

      Alert.alert("Theme Saved", "Theme preference updated successfully.");
    } catch (error) {
      console.log("Theme update error:", error);
      Alert.alert("Error", "Failed to save theme.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#F4F7F3" },
      ]}
    >
      <Text style={[styles.heading, { color: isDark ? "#81C784" : "#2E7D32" }]}>
        ⚙ {t("settings")}
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#1B5E20" }]}>
          🌍 {t("language")}
        </Text>
        <View
          style={[
            styles.pickerWrapper,
            {
              borderColor: isDark ? "#444" : "#C8E6C9",
              backgroundColor: isDark ? "#2A2A2A" : "#F9FFF8",
            },
          ]}
        >
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => handleLanguageChange(itemValue)}
            style={{ color: isDark ? "#fff" : "#000" }}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिन्दी" value="hi" />
            <Picker.Item label="मराठी" value="mr" />
            <Picker.Item label="ಕನ್ನಡ" value="kn" />
          </Picker>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#1B5E20" }]}>
          🎨 {t("theme")}
        </Text>
        <View
          style={[
            styles.pickerWrapper,
            {
              borderColor: isDark ? "#444" : "#C8E6C9",
              backgroundColor: isDark ? "#2A2A2A" : "#F9FFF8",
            },
          ]}
        >
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue) => handleThemeChange(itemValue)}
            style={{ color: isDark ? "#fff" : "#000" }}
          >
            <Picker.Item label="System Default" value="system" />
            <Picker.Item label="Light" value="light" />
            <Picker.Item label="Dark" value="dark" />
          </Picker>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
        <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#1B5E20" }]}>
          ℹ {t("app_info")}
        </Text>
        <Text style={[styles.infoText, { color: isDark ? "#ddd" : "#333" }]}>
          App Name: AgriSaarthi AI
        </Text>
        <Text style={[styles.infoText, { color: isDark ? "#ddd" : "#333" }]}>
          Version: 1.0.1
        </Text>
        <Text style={[styles.infoText, { color: isDark ? "#ddd" : "#333" }]}>
          Developer: Team TechXcel
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 6,
  },
});
