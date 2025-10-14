import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { theme } from "@/styles/Theme";
import { StyleSheet, Text } from "react-native";

export default function RecipesScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.text}>Pantalla de Recetas</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: theme.colors.textDark,
  },
});
