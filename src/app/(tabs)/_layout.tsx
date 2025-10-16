import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withLayoutContext } from "expo-router";
import { View } from "react-native";

const { Navigator } = createBottomTabNavigator();
const Tabs = withLayoutContext(Navigator);
const homeIcon: NonNullable<BottomTabNavigationOptions["tabBarIcon"]> = ({ focused, color, size }) => (
  <Ionicons name={focused ? "home" : "home-outline"} size={26} color={focused ? theme.colors.textSecondary : "#999"} />
);
const addRecipeIcon: NonNullable<BottomTabNavigationOptions["tabBarIcon"]> = ({ focused, color, size }) => (
  <View
    style={{
      backgroundColor: theme.colors.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      marginBottom: 18,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#f3ececff",
      shadowOpacity: 0.2,
      shadowRadius: 6,
    }}>
    <Ionicons name="add" size={30} color="#fef5f5ff" />
  </View>
);
const profileIcon: NonNullable<BottomTabNavigationOptions["tabBarIcon"]> = ({ focused, color, size }) => (
  <Ionicons name={focused ? "person" : "person-outline"} size={size ?? 26} color={focused ? theme.colors.textSecondary : color ?? "#999"} />
);
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 64,
          borderTopColor: "rgba(0,0,0,0.08)",
          elevation: 8,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarIcon: homeIcon,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="recipe/create/index"
        options={{
          tabBarIcon: addRecipeIcon,
          title: "Categories",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: profileIcon,
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
