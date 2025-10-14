import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GroupsScreen() {
  const handleAddGroup = () => {
    //router.push("groups/create/index");
router.push("/(tabs)/(home)/groups/create");
  };

  return (
    <ScreenContainer>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Groups</Text>
              <Text style={styles.subtitle}>Create and share groups with others or simply browse and follow any group of your interest</Text>
            </View>

            <Pressable style={styles.addButton} onPress={handleAddGroup}>
              <Ionicons name="add" size={20} color="#4A5F4D" />
            </Pressable>
          </View>
        </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#3A5A3D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#8A9A8D",
    lineHeight: 20,
    fontWeight: "400",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4A5F4D",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
});
