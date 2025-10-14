import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withLayoutContext } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { theme } from '@/styles/Theme';

const { Navigator } = createBottomTabNavigator();
const Tabs = withLayoutContext(Navigator);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 64,
          borderTopColor: 'rgba(0,0,0,0.08)',
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"               
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Ionicons name="home-outline" size={26}
              color={focused ? theme.colors.primary : '#999'} />
          ),
          title: 'Home',
        }}
      />
      <Tabs.Screen
       name="createRecipe/index"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View style={{
              backgroundColor: theme.colors.primary,
              width: 56, height: 56, borderRadius: 28,
              marginBottom: 18, alignItems: 'center', justifyContent: 'center',
              shadowColor: '#f3ececff', shadowOpacity: 0.2, shadowRadius: 6,
            }}>
              <Ionicons name="add" size={30} color="#fef5f5ff" />
            </View>
          ),
          title: 'Categories',
        }} /> 
      <Tabs.Screen
        name='profile/index'
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Ionicons name="person-outline" size={26}
              color={focused ? theme.colors.primary : '#999'} />
          ),
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
