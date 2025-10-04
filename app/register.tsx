import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import { theme } from "@/src/styles/Theme";
import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("New user:", { name, email, password });
    router.replace("/login"); //por mientras
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Your full name"
              placeholderTextColor={theme.colors.gray400}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: theme.spacing.md }]}>Email</Text>
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

            <CustomButtonCommon title="Sign Up" onPress={handleRegister} style={styles.button} textStyle={styles.buttonText} />

            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" style={styles.footerLink}>
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
