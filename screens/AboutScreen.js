import { Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={screenStyle}>
      <Text style={screenTitle}>ℹ About AgriSaarthi AI</Text>
      <Text style={screenText}>
        This screen will show your project idea and team details.
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
