import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function DiseaseDetectionScreen({ currentTheme }) {
  const { t } = useTranslation();
  const isDark = currentTheme === "dark";

  const [image, setImage] = useState(null);
  const [cropName, setCropName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(t("permission_required"), t("gallery_permission"));
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
      Alert.alert(t("error"), t("could_not_pick_image"));
    }
  };

  const handleDetect = () => {
    if (!image || !cropName.trim() || !problemDescription.trim()) {
      Alert.alert(t("missing_input"), t("disease_missing_input"));
      return;
    }

    setResult({
      disease: "Leaf Spot",
      confidence: "95%",
      solution: t("disease_solution"),
    });

    Alert.alert(
      t("detection_submitted"),
      `${t("crop_name")}: ${cropName}\n${t("problem")}: ${problemDescription}`,
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#F8FAF7" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#81C784" : "#1B5E20" }]}>
        🍃 {t("disease_detection")}
      </Text>
      <Text style={[styles.subtitle, { color: isDark ? "#bbb" : "#4e6e50" }]}>
        {t("disease_detection_sub")}
      </Text>

      <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {image ? t("change_crop_image") : t("upload_crop_image")}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image.uri }} style={styles.previewImage} />
      )}

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2E7D32" }]}>
        {t("crop_name")}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#A5D6A7",
          },
        ]}
        placeholder={t("crop_name_placeholder")}
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={cropName}
        onChangeText={setCropName}
      />

      <Text style={[styles.label, { color: isDark ? "#A5D6A7" : "#2E7D32" }]}>
        {t("describe_problem")}
      </Text>
      <TextInput
        style={[
          styles.input,
          styles.multilineInput,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#fff",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "#444" : "#A5D6A7",
          },
        ]}
        placeholder={t("problem_placeholder")}
        placeholderTextColor={isDark ? "#888" : "#999"}
        value={problemDescription}
        onChangeText={setProblemDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.button} onPress={handleDetect}>
        <Text style={styles.buttonText}>{t("detect_disease")}</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>🩺 {t("detection_result")}</Text>
          <Text style={styles.resultDisease}>{result.disease}</Text>
          <Text style={styles.resultConfidence}>
            {t("confidence")}: {result.confidence}
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
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
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
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
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
