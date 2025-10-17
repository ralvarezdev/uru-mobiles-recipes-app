import { theme } from "@/styles/Theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator, Screen } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

const tabs: Record<string, string> = {
  recipes: "Recipes",
  categories: "Categories",
  groups: "Groups",
};

export default function HomeLayout() {
  return (
    <MaterialTopTabs
      initialRouteName="recipes"
      screenOptions={({ route }) => ({
        tabBarLabel: tabs[route.name] || route.name,
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 17 },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.secondary },
        tabBarStyle: { backgroundColor: theme.colors.primary },
      })}>
      {Object.keys(tabs).map((key) => (
        <MaterialTopTabs.Screen key={key} name={key} />
      ))}
      {/* <MaterialTopTabs.Screen name="recipes" />
      <MaterialTopTabs.Screen name="categories" />
      <MaterialTopTabs.Screen name="groups" /> */}
    </MaterialTopTabs>
  );
}
