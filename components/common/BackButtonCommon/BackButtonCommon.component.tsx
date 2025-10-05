import React, { forwardRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { theme } from "@/src/styles/Theme";

type Props = {
  to?: Href;
  replace?: boolean;
  style?: StyleProp<ViewStyle>;
  edgeOffset?: number; 
  zIndex?: number;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const BackButton = forwardRef<View, Props>(
  ({ to, replace = false, style, edgeOffset = theme.spacing.lg, zIndex = 9999 }, ref) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    const SIZE = clamp(Math.round(width * 0.11), 40, 52);
    const ICON = Math.round(SIZE * 0.50);

    const top =
      Platform.OS === "android"
        ? (StatusBar.currentHeight ?? 0) + edgeOffset
        : insets.top + edgeOffset;

    const onPress = () => {
      if (to) return replace ? router.replace(to) : router.push(to);
      router.back();
    };

    return (
      <View
        pointerEvents="box-none"
        style={[styles.absolute, { top, left: edgeOffset, zIndex }]}
      >
        <TouchableOpacity
          ref={ref}
          activeOpacity={0.85}
          onPress={onPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[
            styles.button,
            {
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              elevation: 6, // Android
              backgroundColor: theme.colors.primary,
            },
            style,
          ]}
        >
          <Ionicons name="chevron-back" size={ICON} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    // sombras iOS
    shadowColor: theme.colors.shadowMedium,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default BackButton;
