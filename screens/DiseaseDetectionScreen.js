import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function DiseaseDetectionScreen() {
  const [image, setImage] = useState(null);
  const [cropName, setCropName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to gallery to upload leaf image.",
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setImage(pickerResult.assets[0]);
      }
    } catch (error) {
      console.log("Image Picker Error:", error);
      Alert.alert("Error", "Could not pick image.");
    }
  };

  const handleDetect = () => {
    if (!image || !cropName.trim() || !problemDescription.trim()) {
      Alert.alert(
        "Missing Input",
        "Please upload an image, enter crop name, and describe the problem.",
      );
      return;
    }

    // Temporary frontend mock result
    setResult({
      disease: "Leaf Spot",
      confidence: "95%",
      solution:
        "Use a copper-based fungicide and avoid overhead watering. Remove infected leaves if possible.",
    });

    Alert.alert(
      "Detection Input Submitted",
      `Crop: ${cropName}\nProblem: ${problemDescription}`,
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🍃 Disease Detection</Text>
      <Text style={styles.subtitle}>
        Upload a crop image and describe the issue for better disease detection.
      </Text>

      {/* IMAGE UPLOAD */}
      <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {image ? "Change Crop Image" : "Upload Crop Image"}
        </Text>
      </TouchableOpacity>

      {/* IMAGE PREVIEW */}
      {image && (
        <Image source={{ uri: image.uri }} style={styles.previewImage} />
      )}

      {/* CROP NAME BELOW IMAGE */}
      <Text style={styles.label}>Crop Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Tomato, Wheat, Cotton"
        value={cropName}
        onChangeText={setCropName}
      />

      {/* DESCRIPTION BELOW CROP NAME */}
      <Text style={styles.label}>Describe the Problem</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="e.g. Leaves are turning yellow and have brown spots"
        value={problemDescription}
        onChangeText={setProblemDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleDetect}>
        <Text style={styles.buttonText}>Detect Disease</Text>
      </TouchableOpacity>

      {/* RESULT */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>🩺 Detection Result</Text>
          <Text style={styles.resultDisease}>{result.disease}</Text>
          <Text style={styles.resultConfidence}>
            Confidence: {result.confidence}
          </Text>
          <Text style={styles.resultSolution}>{result.solution}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F8FAF7",
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#4e6e50",
    textAlign: "center",
    marginBottom: 24,
  },
  imagePickerBtn: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#A5D6A7",
  },
  imagePickerText: {
    color: "#1B5E20",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#A5D6A7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 18,
  },
  multilineInput: {
    minHeight: 110,
  },
  button: {
    backgroundColor: "#1B5E20",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  resultCard: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1B5E20",
  },
  resultDisease: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 6,
  },
  resultConfidence: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  resultSolution: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    lineHeight: 22,
  },
});
