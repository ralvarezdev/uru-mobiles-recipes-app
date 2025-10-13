import { theme } from "@/styles/Theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { StyleSheet } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function HomeLayout() {
  return (
    <>
      <MaterialTopTabs
        initialRouteName="recipes/index"
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 17 },
          tabBarIndicatorStyle: { backgroundColor: theme.colors.secondary },
          tabBarStyle: { backgroundColor: theme.colors.primary },
        }}>
        <MaterialTopTabs.Screen name="recipes/index" options={{ title: "Recetas" }} />
        <MaterialTopTabs.Screen name="categories" options={{ title: "Categorias" }} />
        <MaterialTopTabs.Screen name="groups/index" options={{ title: "Grupos" }} />
      </MaterialTopTabs>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  listContent: { padding: theme.spacing.lg },
  row: { justifyContent: "space-between" },
});
