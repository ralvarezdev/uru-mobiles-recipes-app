import { Category } from '@/services/category/types';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './CategoryCard.style';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: category.image }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.name}>{category.name}</Text>
        {category.recipeCount !== undefined && (
          <Text style={styles.count}>{category.recipeCount} recetas</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
