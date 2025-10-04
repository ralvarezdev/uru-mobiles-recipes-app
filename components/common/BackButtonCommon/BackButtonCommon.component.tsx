import React, { forwardRef } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp, View } from "react-native";
import { Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/src/styles/Theme";

type Props = {
  to?: Href;
  replace?: boolean;
  position?: "absolute" | "relative";
  style?: StyleProp<ViewStyle>;
  size?: number;
  color?: string;
  backgroundColor?: string;
};

const BackButtonCommon = forwardRef<View, Props>(
  ({ to, replace = true, position = "absolute", style, size = 22, color = theme.colors.textLight, backgroundColor = theme.colors.primary }, ref) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handlePress = () => {
      if (to) {
        replace ? router.replace(to) : router.push(to);
      } else {
        router.back();
      }
    };

    return (
      <View
        style={[
          position === "absolute" && {
            position: "absolute",
            top: insets.top + theme.spacing.sm,
            left: theme.spacing.lg,
            zIndex: 10,
          },
        ]}
        pointerEvents="box-none">
        <TouchableOpacity
          ref={ref}
          onPress={handlePress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={[styles.button, { backgroundColor }, style]}>
          <Ionicons name="chevron-back" size={size} color={color} />
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: theme.borderRadius.circle,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.small,
  },
});

export default BackButtonCommon;
