import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n";

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
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState("system");
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAppSettings = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("appLanguage");
        const savedTheme = await AsyncStorage.getItem("appTheme");

        if (savedLang && isMounted && i18n.language !== savedLang) {
          await i18n.changeLanguage(savedLang);
        }

        if (savedTheme && isMounted) {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.log("App settings load error:", e);
      } finally {
        if (isMounted) {
          setIsAppReady(true);
        }
      }
    };

    loadAppSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const effectiveTheme = useMemo(() => {
    return theme === "system" ? systemTheme || "light" : theme;
  }, [theme, systemTheme]);

  const navTheme = useMemo(() => {
    return effectiveTheme === "dark" ? DarkTheme : DefaultTheme;
  }, [effectiveTheme]);

  if (!isAppReady) return null;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash */}
        <Stack.Screen name="Splash" options={{ headerShown: false }}>
          {(props) => <SplashScreen {...props} currentTheme={effectiveTheme} />}
        </Stack.Screen>

        {/* Auth */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} currentTheme={effectiveTheme} />}
        </Stack.Screen>

        <Stack.Screen name="Signup" options={{ headerShown: false }}>
          {(props) => <SignupScreen {...props} currentTheme={effectiveTheme} />}
        </Stack.Screen>

        {/* Main */}
        <Stack.Screen name="Home" options={{ title: "AgriSaarthi AI" }}>
          {(props) => <HomeScreen {...props} currentTheme={effectiveTheme} />}
        </Stack.Screen>

        <Stack.Screen name="CropRecommendation">
          {(props) => (
            <CropRecommendationScreen
              {...props}
              currentTheme={effectiveTheme}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="DiseaseDetection">
          {(props) => (
            <DiseaseDetectionScreen {...props} currentTheme={effectiveTheme} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Irrigation">
          {(props) => (
            <IrrigationScreen {...props} currentTheme={effectiveTheme} />
          )}
        </Stack.Screen>

        <Stack.Screen name="History">
          {(props) => (
            <HistoryScreen {...props} currentTheme={effectiveTheme} />
          )}
        </Stack.Screen>

        <Stack.Screen name="About">
          {(props) => <AboutScreen {...props} currentTheme={effectiveTheme} />}
        </Stack.Screen>

        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen
              {...props}
              currentTheme={effectiveTheme}
              selectedTheme={theme}
              setTheme={setTheme}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
