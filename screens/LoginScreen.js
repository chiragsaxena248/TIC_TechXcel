import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!mobileNumber.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please enter mobile number and password.");
      return;
    }

    if (mobileNumber.length < 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid mobile number.",
      );
      return;
    }

    Alert.alert("Login Successful", "Welcome to AgriSaarthi AI!");
    navigation.replace("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>🌾</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Login to continue using AgriSaarthi AI
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          placeholderTextColor="#777"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        {/* ✅ FIXED SIGNUP BUTTON */}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupText}>
            Don’t have an account?{" "}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4FFF3",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4E6E50",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 22,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F9FFF8",
    borderWidth: 2,
    borderColor: "#A5D6A7",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111",
  },
  loginBtn: {
    backgroundColor: "#1B5E20",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 18,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
  },
  signupLink: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});
