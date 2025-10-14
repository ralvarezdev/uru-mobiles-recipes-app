import { theme } from "@/styles/Theme";
import { Dimensions, StyleSheet} from "react-native";

const { width, height } = Dimensions.get("window");


export const styles = StyleSheet.create({
  greenBackground: {
    position: "absolute",
    top: 0,
    left: -width * 0.07,
    width: "60%",
    height: "45%",
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
  },

  debugButton: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  debugText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: theme.spacing.lg,
    paddingTop: height * 0.12,
  },
  foodImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 30,
    marginLeft: -width * 0.25,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: "center",
    marginTop: -height * 0.05,
  },
  title: {
    fontSize: Math.min(width * 0.12, 48),
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: Math.min(width * 0.09, 36),
    fontWeight: "300",
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  button: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
    color: theme.colors.textMuted,
  },
  signInText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
});