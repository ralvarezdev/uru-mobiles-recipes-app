import { Recipe } from "@/entities";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./RecipeCard.style";

interface RecipeCardProps {
  recipe: Recipe;
  onPress: (recipe: Recipe) => void;
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(recipe)} activeOpacity={0.8}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.info}>
          <Ionicons name="time-outline" size={16} color={theme.colors.textMuted} />
          <Text style={styles.time}>
            {recipe.prepareTime} {recipe.unitPrepareTime}
          </Text>
          <Ionicons name="person" size={16} color={theme.colors.textMuted} />
          <Text style={styles.time}>{recipe.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

