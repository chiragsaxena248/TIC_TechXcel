import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen({ navigation, currentTheme }) {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#F4FFF3" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#81C784" : "#1B5E20" }]}>
        {t("welcome_title")}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#ccc" : "#4E6E50" }]}>
        {t("welcome_subtitle")}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>{t("get_started")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 35,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#1B5E20",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
