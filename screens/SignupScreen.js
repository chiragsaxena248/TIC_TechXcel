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

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");
  const [landSize, setLandSize] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (
      !name.trim() ||
      !mobile.trim() ||
      !village.trim() ||
      !landSize.trim() ||
      !password.trim()
    ) {
      Alert.alert("Missing Fields", "Please fill all details.");
      return;
    }

    if (mobile.length < 10) {
      Alert.alert("Invalid Mobile", "Enter valid mobile number.");
      return;
    }

    Alert.alert(
      "Registration Successful",
      `Welcome ${name}! You can now login.`,
    );

    navigation.replace("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌾 Farmer Registration</Text>
      <Text style={styles.subtitle}>
        Create your account to start using AgriSaarthi AI
      </Text>

      <View style={styles.card}>
        <Input label="Full Name" value={name} setValue={setName} />
        <Input
          label="Mobile Number"
          value={mobile}
          setValue={setMobile}
          keyboardType="phone-pad"
        />
        <Input label="Village / City" value={village} setValue={setVillage} />
        <Input
          label="Land Size (in acres)"
          value={landSize}
          setValue={setLandSize}
          keyboardType="numeric"
        />
        <Input
          label="Create Password"
          value={password}
          setValue={setPassword}
          secure
        />

        <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
          <Text style={styles.signupBtnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  setValue,
  keyboardType = "default",
  secure = false,
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${label}`}
        placeholderTextColor="#777"
        value={value}
        onChangeText={setValue}
        keyboardType={keyboardType}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4FFF3",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#4E6E50",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F9FFF8",
    borderWidth: 2,
    borderColor: "#A5D6A7",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#111",
  },
  signupBtn: {
    backgroundColor: "#1B5E20",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  signupBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    marginTop: 14,
    color: "#555",
  },
  loginLink: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});
