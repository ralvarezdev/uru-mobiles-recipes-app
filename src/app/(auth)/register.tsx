import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
// import BackButton from "components/common/BackButtonCommon/BackButtonCommon.component";
import BackButton from "@/components/common/BackButtonCommon/BackButtonCommon.component";
import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { User } from "@/entities";
import { theme } from "@/styles/Theme";
// import CustomButtonCommon from "components/common/CustomButtonCommon/CustomButtonCommon.component";

export default function RegisterScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUser = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log("New user:", { user, password });
    router.replace("/login"); //por mientras
    // authService.register({ ...user, password } as RegisterInput);
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <BackButton to="/login" />
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Your name"
              placeholderTextColor={theme.colors.gray400}
              value={user.name}
              onChangeText={(text) => handleChangeUser("name", text)}
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: theme.spacing.md }]}>Last Name</Text>
            <TextInput
              placeholder="Your last name"
              placeholderTextColor={theme.colors.gray400}
              value={user.lastName}
              onChangeText={(text) => handleChangeUser("lastName", text)}
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: theme.spacing.md }]}>Email</Text>
            <TextInput
              placeholder="Your email"
              placeholderTextColor={theme.colors.gray400}
              value={user.email}
              onChangeText={(text) => handleChangeUser("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: theme.spacing.md }]}>Username</Text>
            <TextInput
              placeholder="Your username"
              placeholderTextColor={theme.colors.gray400}
              value={user.username}
              onChangeText={(text) => handleChangeUser("username", text)}
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
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password" // iOS
              autoComplete="password" // iOS/Android
              returnKeyType="done"
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
    </ScreenContainer>
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
