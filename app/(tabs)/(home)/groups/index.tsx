import { theme } from '@/src/styles/Theme';
import { View, Text, StyleSheet } from 'react-native';

export default function GroupsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Grupos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 20,
    color: theme.colors.textDark,
  },
});