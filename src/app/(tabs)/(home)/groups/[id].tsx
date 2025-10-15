import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Detalle del grupo</Text>
        <Text style={styles.text}>ID del grupo: {id}</Text>

        {/* Aquí más adelante puedes mostrar:
            - nombre del grupo
            - lista de recetas
            - miembros, etc.
        */}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#365C49",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#6B7C70",
  },
});
