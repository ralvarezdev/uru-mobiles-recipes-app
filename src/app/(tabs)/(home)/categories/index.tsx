import { CategoryList } from "@/components/common/CategoryList/CategoryList.component";
import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { ENV } from "@/config/env";
import { Category } from "@/entities";
import { categoryService } from "@/services";
import { theme } from "@/styles/Theme";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function CategoriesScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    console.log("useEffect loadCategories");
    console.log("useEffect loadCategories", ENV);
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    console.log("funcion loadCategories");
    setLoading(true);
    const categories = await categoryService.getCategories();
    console.log("categories", categories);
    setCategories(categories);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }
  // const mockCategories: Category[] = [
  //   { id: 1, title: "Postres", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400", recipeCount: 2 },
  //   { id: 2, title: "Pastas", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", recipeCount: 1 },
  //   { id: 3, title: "Carnes", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400", recipeCount: 3 },
  //   { id: 4, title: "Ensaladas", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", recipeCount: 0 },
  //   { id: 5, title: "Sopas", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400", recipeCount: 0 },
  //   { id: 6, title: "Bebidas", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", recipeCount: 0 },
  //   { id: 7, title: "Snacks", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400", recipeCount: 0 },
  //   { id: 8, title: "Desayunos", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400", recipeCount: 0 },
  // ];

  // const handleCategoryPress = ({ id, title }: Category) => {
  //   const url = `/categories/${id}` as RelativePathString;
  //   console.log("url", url);
  //   router.push({ pathname: url, params: { categoryTitle: title } });
  // };

  return (
    <ScreenContainer>
      <CategoryList categories={categories} listHeaderComponent={<Text style={styles.title}>Categories</Text>} />
      {/* <FlatList
        data={mockCategories}
        renderItem={({ item }) => <CategoryCard category={item} onPress={handleCategoryPress} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        // contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      /> */}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 32, fontWeight: "700", color: "#3A5A3D", marginBottom: 8 },
  listContent: { padding: theme.spacing.lg },
  row: { justifyContent: "space-between" },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
