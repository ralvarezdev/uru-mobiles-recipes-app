import { Category } from "@/entities";
import { RelativePathString, router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CategoryCard.style";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: Readonly<CategoryCardProps>) {
  const handleOnPress = () => {
    const url = `/categories/${category.id}` as RelativePathString;
    router.push({ pathname: url, params: { categoryTitle: category.title } });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handleOnPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: category.image }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.name}>{category.title}</Text>
        {category.recipeCount !== undefined && <Text style={styles.count}>{category.recipeCount} recetas</Text>}
      </View>
    </TouchableOpacity>
  );
}
