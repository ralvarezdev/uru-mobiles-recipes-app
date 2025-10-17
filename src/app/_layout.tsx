import { GlobalLayout } from "@/components/common/GlobalLayout/GlobalLayout.component";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Opcional: fuentes
// import * as Font from "expo-font";
// import { Ionicons } from "@expo/vector-icons";
import "react-native-reanimated";

// Mantener el splash visible hasta terminar la precarga
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ya estaba prevenido, ignorar */
});

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // 1) Precargar IMÁGENES locales
        const images = [
          require("@/assets/images/welcome-food.png"),
          // agrega más imágenes si quieres:
          // require("@/assets/images/logo.png"),
        ];
        await Promise.all(images.map((m) => Asset.fromModule(m).downloadAsync()));

        // 2) (Opcional) Precargar FUENTES
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
        //   "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
        // });

        // Si todo ok:
        setAppIsReady(true);
      } catch (e) {
        // Loguea el error si algo falla; no bloquear la app
        console.warn("Error precargando assets:", e);
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Oculta el splash cuando el árbol ya se montó y appIsReady = true
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Es seguro ocultar el splash
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Mientras no esté listo, mantenemos el splash (no renderizamos la app)
  if (!appIsReady) {
    return null; // El SplashScreen sigue visible
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <RootLayoutNav />
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GlobalLayout>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)/login/index" />
          <Stack.Screen name="(auth)/register/index" />
        </Stack>
      </GlobalLayout>
    </ThemeProvider>
  );
}
