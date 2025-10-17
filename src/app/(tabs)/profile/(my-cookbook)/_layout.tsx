import { theme } from "@/styles/Theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);

export default function MyCookbookTabsLayout() {
  return (
    <TopTabs
      initialRouteName="recipes"
      screenOptions={{
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 16 },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.secondary },
        tabBarStyle: { backgroundColor: theme.colors.primary },
      }}>
      {/* Los name deben coincidir con los archivos hijos */}
      <TopTabs.Screen name="recipes" options={{ title: "My Recipes" }} />
      <TopTabs.Screen name="groups" options={{ title: "My Groups" }} />
    </TopTabs>
  );
}
