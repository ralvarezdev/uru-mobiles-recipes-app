import BackButton from "@/components/common/BackButtonCommon/BackButtonCommon.component";
import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { authService, LoginInput } from "@/services";
import { theme } from "@/styles/Theme";
import { Href, Link, router, Stack } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [loginInput, setLoginInput] = useState<LoginInput>({ email: "nochi@example.com", password: "nochi" } as LoginInput);
  const [loading, setLoading] = useState(false);

  const handleChangeLoginInput = (field: string, value: string) => {
    setLoginInput((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!loginInput.email || loginInput.email.trim() === "" || !loginInput.password || loginInput.password.trim() === "") {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Datos incorrectos",
          text2: "Por favor, verifique email y contraseña.",
          position: "bottom", // o 'top'
        });
        return;
      }
      const authUser = await authService.login(loginInput);
      console.log("login", authUser);
      if (authUser.id) {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Usuario autenticado",
          text2: "Se le redireccionara al home..",
          position: "bottom", // o 'top'
        });
        router.replace("/(tabs)/(home)/recipes" as Href);
      } else {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Usuario no encontrado",
          text2: "Por favor, verifique email y contraseña.",
          position: "bottom", // o 'top'
        });
      }
    } catch (error) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Hubo un problema con su solicitud. ",
        text2: `Por favor, intentelo de nuevo mas tarde.`,
        position: "bottom", // o 'top'
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <BackButton to="/" />

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
              value={loginInput.email}
              onChangeText={(text) => handleChangeLoginInput("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: theme.spacing.md }]}>Password</Text>
            <TextInput
              placeholder="Your password"
              placeholderTextColor={theme.colors.gray400}
              value={loginInput.password}
              onChangeText={(text) => handleChangeLoginInput("password", text)}
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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
