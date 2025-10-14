import { theme } from "@/styles/Theme";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export const ScreenContainer = ({ children }: { children: ReactNode }) => <View style={styles.container}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    // padding: 16,
  },
});
