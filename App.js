import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import "./i18n";

import AboutScreen from "./screens/AboutScreen";
import CropRecommendationScreen from "./screens/CropRecommendationScreen";
import DiseaseDetectionScreen from "./screens/DiseaseDetectionScreen";
import HistoryScreen from "./screens/HistoryScreen";
import HomeScreen from "./screens/HomeScreen";
import IrrigationScreen from "./screens/IrrigationScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignupScreen from "./screens/SignupScreen";
import SplashScreen from "./screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("appLanguage");
        if (savedLang) {
          await i18n.changeLanguage(savedLang);
        }
      } catch (e) {
        console.log("Language load error:", e);
      }
    };

    loadLanguage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "AgriSaarthi AI" }}
        />
        <Stack.Screen
          name="CropRecommendation"
          component={CropRecommendationScreen}
        />
        <Stack.Screen
          name="DiseaseDetection"
          component={DiseaseDetectionScreen}
        />
        <Stack.Screen name="Irrigation" component={IrrigationScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
