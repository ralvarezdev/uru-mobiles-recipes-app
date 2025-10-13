import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import { theme } from "@/styles/Theme";
// import CustomButtonCommon from "components/common/CustomButtonCommon/CustomButtonCommon.component";
import { Link, router } from "expo-router";
import React from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

      {/* BOTÓN TEMPORAL DE DEBUG */}
      <TouchableOpacity onPress={() => router.push("/recipes")} style={styles.debugButton}>
        <Text style={styles.debugText}>Ver Tabs</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.greenBackground} />

        <View style={styles.imageContainer}>
          <Image source={require("@/assets/images/welcome-food.png")} style={styles.foodImage} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Cooking</Text>
          <Text style={styles.subtitle}>Delicious</Text>
          <Text style={styles.subtitle}>Like a Chef</Text>

          <Link href="/login" asChild>
            <CustomButtonCommon title="Get Started" style={styles.button} />
          </Link>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Don't you have an account? </Text>
            <Link href="/register" asChild>
              <Text style={styles.signInText}>Sign In </Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  greenBackground: {
    position: "absolute",
    top: 0,
    left: -width * 0.07,
    width: "60%",
    height: "45%",
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
  },

  debugButton: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  debugText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: theme.spacing.lg,
    paddingTop: height * 0.12,
  },
  foodImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 30,
    marginLeft: -width * 0.25,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: "center",
    marginTop: -height * 0.05,
  },
  title: {
    fontSize: Math.min(width * 0.12, 48),
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: Math.min(width * 0.09, 36),
    fontWeight: "300",
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  signInText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});
