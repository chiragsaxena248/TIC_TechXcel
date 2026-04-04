import { Picker } from "@react-native-picker/picker";
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

export default function IrrigationScreen() {
  const [landSize, setLandSize] = useState("");
  const [city, setCity] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [waterAvailability, setWaterAvailability] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [otherWaterUse, setOtherWaterUse] = useState("");

  const handleSubmit = () => {
    if (
      !landSize ||
      city.trim() === "" ||
      !selectedCrop ||
      !waterAvailability ||
      !waterSource ||
      otherWaterUse.trim() === ""
    ) {
      Alert.alert("Missing Input", "Please fill all the fields.");
      return;
    }

    const payload = {
      landSize: landSize.trim(),
      city: city.trim(),
      crop: selectedCrop,
      waterAvailability,
      waterSource,
      otherWaterUse: otherWaterUse.trim(),
    };

    console.log("Irrigation Input:", payload);

    Alert.alert(
      "Input Submitted",
      `Land Size: ${landSize} acres\nCity: ${city}\nCrop: ${selectedCrop}\nWater Availability: ${waterAvailability}\nWater Source: ${waterSource}\nOther Utility: ${otherWaterUse}`,
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Irrigation Advisory</Text>
      <Text style={styles.subtitle}>
        Enter your farm details for smart irrigation guidance
      </Text>

      <Text style={styles.label}>Land Size (in acres)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 5"
        keyboardType="numeric"
        value={landSize}
        onChangeText={setLandSize}
      />

      <Text style={styles.label}>Farming City / Area</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Bhopal"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Crop Name</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCrop}
          onValueChange={(itemValue) => setSelectedCrop(itemValue)}
        >
          <Picker.Item label="Select Crop" value="" />
          <Picker.Item label="Wheat" value="wheat" />
          <Picker.Item label="Rice" value="rice" />
          <Picker.Item label="Soybean" value="soybean" />
          <Picker.Item label="Cotton" value="cotton" />
          <Picker.Item label="Maize" value="maize" />
          <Picker.Item label="Sugarcane" value="sugarcane" />
          <Picker.Item label="Tomato" value="tomato" />
          <Picker.Item label="Potato" value="potato" />
          <Picker.Item label="Onion" value="onion" />
          <Picker.Item label="Chilli" value="chilli" />
        </Picker>
      </View>

      <Text style={styles.label}>Water Availability</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={waterAvailability}
          onValueChange={(itemValue) => setWaterAvailability(itemValue)}
        >
          <Picker.Item label="Select Water Availability" value="" />
          <Picker.Item label="Low" value="low" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="High" value="high" />
        </Picker>
      </View>

      <Text style={styles.label}>Source of Water</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={waterSource}
          onValueChange={(itemValue) => setWaterSource(itemValue)}
        >
          <Picker.Item label="Select Water Source" value="" />
          <Picker.Item label="Borewell" value="borewell" />
          <Picker.Item label="Canal" value="canal" />
          <Picker.Item label="Rainwater" value="rainwater" />
          <Picker.Item label="River" value="river" />
          <Picker.Item label="Tank / Pond" value="tank_pond" />
        </Picker>
      </View>

      <Text style={styles.label}>Other Utility of Water</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Household use, livestock, etc."
        value={otherWaterUse}
        onChangeText={setOtherWaterUse}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4fff3",
    padding: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1b5e20",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#4e6e50",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#a5d6a7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 25,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#a5d6a7",
    borderRadius: 12,
    marginBottom: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#1b5e20",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
