import { pallette } from './Pallette';

export const theme = {
  colors: pallette,
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  typography: {
    h1: {
      fontSize: 48,
      fontWeight: 'bold' as const,
      color: pallette.primary,
    },
    h2: {
      fontSize: 36,
      fontWeight: '300' as const,
      color: pallette.secondary,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      color: pallette.textDark,
    },
    body: {
      fontSize: 16,
      color: pallette.textDark,
    },
    caption: {
      fontSize: 14,
      color: pallette.textMuted,
    },
    button: {
      fontSize: 18,
      fontWeight: 'bold' as const,
      color: pallette.textLight,
    },
  },
  
  borderRadius: {
    small: 8,
    medium: 16,
    large: 25,
    circle: 50,
  },
  
  shadows: {
    small: {
      shadowColor: pallette.shadowLight,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: pallette.shadowMedium,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;

export type Theme = typeof theme;