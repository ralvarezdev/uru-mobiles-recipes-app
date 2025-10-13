
import { Recipe } from "@/entities/Recipe";

export const RECIPES: Recipe[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    title: 'Pernil con Hojas de Romero',
    description: 'Receta de pernil ahumado con romero.',
    prepareTime: 90,
    portions: 8,
    categoryId: 1, 
    unitPrepareTime: 'minutes',
    ingredients: "hola",
    steps: "chau",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512058564366-c9e9f3a0c5b1?w=1200',
    title: 'Ensalada César',
    description: 'Receta clásica de ensalada César.', 
    prepareTime: 20,
    portions: 4,
    categoryId: 1,
    unitPrepareTime: 'minutes',
    ingredients: "hola",
    steps: "chau",
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512058564366-c9e9f3a0c5b1?w=1200',
    title: 'Ensalada César',
    description: 'Receta clásica de ensalada César.', 
    prepareTime: 20,
    portions: 4,
    categoryId: 4,
    unitPrepareTime: 'minutes',
    ingredients: "hola",
    steps: "chau",
  },
]
