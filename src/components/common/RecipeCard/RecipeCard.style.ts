import { StyleSheet } from "react-native";
import { theme } from "@/styles/Theme";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.textDark,
    marginBottom: theme.spacing.sm,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  time: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
});
