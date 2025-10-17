import { theme } from "@/styles/Theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  shadowWrap: {
    // deja espacio a los lados para que la sombra sea visible
    // marginHorizontal: 16,                // o usa theme.spacing.md
    marginBottom: 10,                    // como ya tenías
    borderRadius: 12,
    // sombra
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
    // importante: no recortar la sombra
    overflow: "visible",
  },

  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.background, // color de la tarjeta
    borderRadius: 12,
    overflow: "hidden", // para redondear el contenido sin matar la sombra del wrap
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
