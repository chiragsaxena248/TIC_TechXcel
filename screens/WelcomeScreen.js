import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AgriSaarthi AI</Text>
      <Text style={styles.subtitle}>
        Empowering farmers with smart crop, irrigation and disease guidance.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FFF3",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4E6E50",
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
