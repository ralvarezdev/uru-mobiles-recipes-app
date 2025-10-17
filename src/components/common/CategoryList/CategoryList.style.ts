import { theme } from "@/styles/Theme";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  row: { justifyContent: "space-between" },
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
