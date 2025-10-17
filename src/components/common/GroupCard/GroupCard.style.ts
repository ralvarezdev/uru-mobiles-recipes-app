import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#365C49", // verde oscuro de tu mock
    borderRadius: 16,
    padding: 16,
    // marginTop:5,
    // marginVertical: 5,
    // sombra cross-platform
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
    }),
  },
  cardPressed: { opacity: 0.95, transform: [{ scale: 0.997 }] },
  cardDisabled: { opacity: 0.5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  texts: { flex: 1, paddingRight: 8 },
  title: {
    color: "#ECF3EE",
    fontSize: 16,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    color: "#C9D5CF",
    fontSize: 12,
  },
  menuBtn: {
    padding: 6,
    borderRadius: 999,
  },
});
