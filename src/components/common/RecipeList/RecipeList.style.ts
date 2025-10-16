import { theme } from "@/styles/Theme";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: theme.colors.textDark,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.gray400,
    textAlign: "center",
  },
});
