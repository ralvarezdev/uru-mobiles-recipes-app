import { theme } from "@/styles/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerError: {
    borderColor: theme.colors.error || "#ff0000",
  },
  picker: {
    height: 50,
  },
  errorText: {
    color: theme.colors.error || "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
});
