import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function HistoryScreen({ currentTheme }) {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  return (
    <View
      style={[screenStyle, { backgroundColor: isDark ? "#121212" : "#F8FAF7" }]}
    >
      <Text style={[screenTitle, { color: isDark ? "#fff" : "#111" }]}>
        {t("history_title")}
      </Text>
      <Text style={[screenText, { color: isDark ? "#bbbbbb" : "#666" }]}>
        {t("history_desc")}
      </Text>
    </View>
  );
}

const screenStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
};

const screenTitle = {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 12,
  textAlign: "center",
};

const screenText = {
  fontSize: 16,
  textAlign: "center",
};
