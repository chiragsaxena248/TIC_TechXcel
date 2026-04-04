import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // Indian mobile validation
  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  // Password validation
  const validatePassword = (pass) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(pass);
  };

  const handleLogin = () => {
    if (!mobileNumber.trim()) {
      Alert.alert("Invalid Mobile Number", "Mobile number is required.");
      return;
    }

    if (!validateMobile(mobileNumber.trim())) {
      Alert.alert(
        "Invalid Mobile Number",
        "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert("Invalid Password", "Password is required.");
      return;
    }

    if (!validatePassword(password.trim())) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters and contain at least 1 letter and 1 number.",
      );
      return;
    }

    // ✅ If valid, go to Home screen
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ""))}
        keyboardType="number-pad"
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Go to Signup */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signupText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#2E7D32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: "#F9F9F9",
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#2E7D32",
    fontSize: 15,
    fontWeight: "600",
  },
});
