import { theme } from '@/styles/Theme';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - (theme.spacing.lg * 2) - theme.spacing.md) / 2; 

export const styles = StyleSheet.create({
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