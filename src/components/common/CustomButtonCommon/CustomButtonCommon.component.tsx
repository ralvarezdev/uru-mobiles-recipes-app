import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface CustomButtonCommonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: IoniconName;
}

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const CustomButtonCommon: React.FC<CustomButtonCommonProps> = ({ title, onPress, style, textStyle, icon }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <Ionicons name={icon} size={20} color={theme.colors.textLight} />}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.large,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textLight,
  },
});

export default CustomButtonCommon;
