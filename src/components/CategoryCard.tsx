import { Category } from '@/services/category/types';
import { theme } from '@/styles/Theme';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');
const cardWidth = (width - (theme.spacing.lg * 2) - theme.spacing.md) / 2; // 2 columnas con gap

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

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: cardWidth * 0.8,
    backgroundColor: theme.colors.gray200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginBottom: 2,
  },
  count: {
    fontSize: 12,
    color: theme.colors.textLight,
    opacity: 0.9,
  },
});