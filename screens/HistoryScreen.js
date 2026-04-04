import { Text, View } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={screenStyle}>
      <Text style={screenTitle}>📜 History</Text>
      <Text style={screenText}>
        This screen will show previous advisory results.
      </Text>
    </View>
  );
}

const screenStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
  backgroundColor: "#F8FAF7",
};

const screenTitle = {
  fontSize: 28,
  fontWeight: "bold",
  marginBottom: 12,
};

const screenText = {
  fontSize: 16,
  color: "#666",
  textAlign: "center",
};
