import { Recipe } from "@/entities";
import { theme } from "@/styles/Theme";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type RecipeDetailProps = { recipe: Recipe };

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.image }} style={styles.hero} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.desc}>{recipe.description}</Text>

        <Text style={styles.section}>INGREDIENTES</Text>
        <View style={{ gap: 6 }}>
          {/* {(recipe.ingredients ?? []).map((ingredient, index) => (
            <Text key={index}>• {ingredient}</Text>
          ))} */}
          <Text>{recipe.ingredients}</Text>
        </View>

        <Text style={[styles.section, { marginTop: 16 }]}>INSTRUCCIONES</Text>
        <View style={{ gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text>{recipe.steps}</Text>
            {/* <Text style={{ color: theme.colors.textMuted }}>{step.content}</Text> */}
          </View>
          {/* {(recipe.steps ?? []).map((step, index) => (
            <View key={index} style={{ flexDirection: "row", gap: 8 }}>
              <Text style={{ fontWeight: "700" }}>{index + 1}.</Text>
              <View style={{ flex: 1 }}>
                {!!step.title && <Text style={{ fontWeight: "600" }}>{step.title}</Text>}
                <Text style={{ color: theme.colors.textMuted }}>{step.content}</Text>
              </View>
            </View>
          ))} */}
        </View>
        <View style={{ height: 24 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    height: 220,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  desc: {
    marginTop: 6,
    color: theme.colors.textMuted,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 13,
  },
  section: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.gray700,
  },
});
