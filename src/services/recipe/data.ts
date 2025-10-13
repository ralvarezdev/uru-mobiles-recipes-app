// src/services/recipe/mockData.ts
import { Recipe } from './types';

export const RECIPES: Recipe[] = [
  {
    id: 'r1',
    categoryId: '1', // Postres
    title: 'Pernil con Hojas de Romero',
    description: 'Receta de pernil ahumado con romero.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    cookTime: 240,
    servings: 5,
    ingredients: [
      '1 pernil de cerdo 6 kg',
      '1 limón',
      '2 cebollas 100 g',
      '17 dientes de ajo',
      '125 ml aceite',
      '60 ml salsa inglesa',
      '135 g azúcar',
    ],
    steps: [
      { title: 'Preparación', content: 'Marina el pernil 12 h en refrigeración.' },
      { title: 'Horneado', content: 'Hornea a 180°C por 2–3 h, bañando con salsa.' },
      { title: 'Reposo', content: 'Deja reposar 15 min antes de cortar.' },
    ],
  },
  {
    id: 'r2',
    categoryId: '2', // Pastas
    title: 'Pasta Alfredo',
    cookTime: 30,
    servings: 2,
    ingredients: ['200 g pasta', '200 ml crema', 'Queso parmesano', 'Mantequilla', 'Sal'],
    steps: [{ content: 'Cocer pasta y mezclar con salsa alfredo.' }],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=1200',
  },
  // agrega más…
];
