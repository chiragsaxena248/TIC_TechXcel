import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import i18n from "../src/i18n";

export default function LanguageSelectionScreen({ navigation }) {
  const systemScheme = useColorScheme();
  const [selectedLang, setSelectedLang] = useState("en");

  const isDark = systemScheme === "dark";

  const bg = isDark ? "#121212" : "#F8FAF7";
  const cardBg = isDark ? "#1E1E1E" : "#ffffff";
  const text = isDark ? "#ffffff" : "#111111";
  const subText = isDark ? "#bbbbbb" : "#666666";

  const saveLanguageAndContinue = async () => {
    try {
      await AsyncStorage.setItem("appLanguage", selectedLang);
      await AsyncStorage.setItem("languageSelected", "true");
      await i18n.changeLanguage(selectedLang);
      navigation.replace("Welcome");
    } catch (error) {
      console.log("Error saving language:", error);
    }
  };

  const OptionButton = ({ label, code }) => (
    <TouchableOpacity
      onPress={() => setSelectedLang(code)}
      style={{
        padding: 16,
        borderRadius: 14,
        marginBottom: 14,
        backgroundColor: selectedLang === code ? "#2E7D32" : cardBg,
        borderWidth: 1,
        borderColor: selectedLang === code ? "#2E7D32" : "#ddd",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: selectedLang === code ? "#fff" : text,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: text,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        🌾 AgriSaarthi AI
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: text,
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Choose Your Language
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: subText,
          textAlign: "center",
          marginBottom: 28,
        }}
      >
        अपनी भाषा चुनें / ನಿಮ್ಮ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ / तुमची भाषा निवडा
      </Text>

      <OptionButton label="English" code="en" />
      <OptionButton label="हिंदी" code="hi" />
      <OptionButton label="ಕನ್ನಡ" code="kn" />
      <OptionButton label="मराठी" code="mr" />

      <TouchableOpacity
        onPress={saveLanguageAndContinue}
        style={{
          backgroundColor: "#2E7D32",
          padding: 18,
          borderRadius: 16,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
