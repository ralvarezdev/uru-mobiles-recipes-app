import { Recipe } from "./types";

// Mock de recetas por categoría
const mockRecipes: Recipe[] = [
  // Carnes (categoryId: '3')
  {
    id: '1',
    title: 'Pernil Con Hojas de Romero',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
    cookTime: 240,
    categoryId: '3',
  },
  {
    id: '2',
    title: 'Carne Ahumada Adobada con...',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400',
    cookTime: 300,
    categoryId: '3',
  },
  {
    id: '3',
    title: 'Chorizo Simple',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400',
    cookTime: 60,
    categoryId: '3',
  },
  // Postres (categoryId: '1')
  {
    id: '4',
    title: 'Tiramisú Clásico',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
    cookTime: 30,
    categoryId: '1',
  },
  {
    id: '5',
    title: 'Cheesecake de Fresas',
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400',
    cookTime: 45,
    categoryId: '1',
  },
];

// Obtener recetas por categoría
export const getRecipesByCategory = async (categoryId: string): Promise<Recipe[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecipes.filter(recipe => recipe.categoryId === categoryId);
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRecipes.find(recipe => recipe.id === id) || null;
};

// TODO: Con API real:
// export const getRecipesByCategory = async (categoryId: string) => {
//   const response = await fetch(`https://tuapi.com/api/categories/${categoryId}/recipes`);
//   return await response.json();
// };