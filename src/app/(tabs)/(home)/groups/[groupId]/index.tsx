import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GroupDetailScreen() {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Detalle del grupo</Text>
        <Text style={styles.text}>ID del grupo: {groupId}</Text>

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
