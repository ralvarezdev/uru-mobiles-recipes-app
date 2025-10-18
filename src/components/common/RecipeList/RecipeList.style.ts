import { theme } from "@/styles/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /** --- Wrapper de cada ítem --- */
  itemWrapper: {
    position: "relative",
    marginBottom: 10,
  },

  /** --- Checkbox --- */
  checkboxContainer: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  /** --- Texto genérico --- */
  text: {
    fontSize: 20,
    color: theme.colors.textDark,
  },

  /** --- Estados vacíos --- */
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
