import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./style";
const welcomeImg = require("@/assets/images/welcome-food.png");

export default function WelcomeScreen() {
  return (
    <ScreenContainer>
      <View style={styles.greenBackground} />

      <View style={styles.imageContainer}>
        <Image source={welcomeImg} style={styles.foodImage} />
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
    </ScreenContainer>
  );
}
