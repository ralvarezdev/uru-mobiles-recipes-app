import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, Link } from "expo-router";
import { theme } from "@/src/styles/Theme";
import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import BackButtonCommon from "@/components/common/BackButtonCommon/BackButtonCommon.component";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    // TODO: autenticar con api
    // router.replace("/(tabs)");
    console.log({ email, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <BackButtonCommon to="/" />

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Your email"
              placeholderTextColor={theme.colors.gray400}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: theme.spacing.md }]}>Password</Text>
            <TextInput
              placeholder="Your password"
              placeholderTextColor={theme.colors.gray400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <CustomButtonCommon title="Sign In" onPress={onSubmit} style={styles.button} textStyle={styles.buttonText} />

            <Text style={styles.footerText}>
              Don't you have an account?{" "}
              <Link href="/register" style={styles.footerLink}>
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.h3.fontSize + 4,
    fontWeight: "800",
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textMuted,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    color: theme.colors.textDark,
  },
  button: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.medium,
  },
  buttonText: {
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    color: theme.typography.button.color,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
  footerLink: {
    color: theme.colors.primary,
    fontWeight: "700",
  },
});
