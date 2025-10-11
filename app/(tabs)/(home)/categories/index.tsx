import { Category } from "@/services/category/types";
import { theme } from "@/styles/Theme";
import CategoryCard from "components/CategoryCard";
import { router } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const mockCategories: Category[] = [
    { id: "1", name: "Postres", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400", recipeCount: 2 },
    { id: "2", name: "Pastas", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", recipeCount: 1 },
    { id: "3", name: "Carnes", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400", recipeCount: 3 },
    { id: "4", name: "Ensaladas", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", recipeCount: 0 },
    { id: "5", name: "Sopas", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", recipeCount: 0 },
    { id: "6", name: "Bebidas", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", recipeCount: 0 },
    { id: "7", name: "Snacks", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400", recipeCount: 0 },
    { id: "8", name: "Desayunos", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400", recipeCount: 0 },
  ];

  const handleCategoryPress = (category: Category) => {
    router.push(`${category.id}?categoryName=${encodeURIComponent(category.name)}` as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <FlatList
        data={mockCategories}
        renderItem={({ item }) => <CategoryCard category={item} onPress={handleCategoryPress} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  listContent: { padding: theme.spacing.lg },
  row: { justifyContent: "space-between" },
});
