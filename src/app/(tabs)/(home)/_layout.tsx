import { theme } from "@/styles/Theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function HomeLayout() {
  return (
    <MaterialTopTabs
      //initialRouteName="recipes/index"
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 17 },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.secondary },
        tabBarStyle: { backgroundColor: theme.colors.primary },
      }}>
      <MaterialTopTabs.Screen name="recipes" options={{ title: "Recetas" }} />
      <MaterialTopTabs.Screen name="categories" options={{ title: "Categorias" }} />
      <MaterialTopTabs.Screen name="groups" options={{ title: "Grupos" }} />
    </MaterialTopTabs>
  );
}
