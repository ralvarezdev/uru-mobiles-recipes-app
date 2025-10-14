import { theme } from "@/styles/Theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0C8",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FAFAF8",
    fontSize: 14,
    color: "#333",
  },
  inputError: {
    borderColor: "#ff0000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D0D0C8",
    borderRadius: 12,
    backgroundColor: "#FAFAF8",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  datePlaceholder: {
    fontSize: 14,
    color: "#999",
  },
  imageSection: {
    height: 180,
    backgroundColor: "#E5E7DF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageSectionError: {
    borderWidth: 2,
    borderColor: "#ff0000",
  },
  imageText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B8E7F",
    fontWeight: "500",
  },
  imageTextSuccess: {
    marginTop: 12,
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  error: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
});
