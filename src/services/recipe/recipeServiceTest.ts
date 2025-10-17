import { Recipe } from "@/entities/Recipe";

// Mock de recetas por categoría
const mockRecipes: Recipe[] = [
  // Carnes (categoryId: '3')
  {
    id: 1,
    title: "Pernil Con Hojas de Romero",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400",
    prepareTime: 240,
    unitPrepareTime: "min",
    categoryId: 3,
    portions: 4,
    ingredients: "1 kg de pollo",
    steps: "1.- Descongelar\n2.- Cocinar",
    author: "nochi",
  },
  {
    id: 2,
    title: "Carne Ahumada Adobada con...",
    image:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=200",
    prepareTime: 300,
    unitPrepareTime: "min",
    categoryId: 3,
    portions: 2,
    ingredients: "1 kg de pollo",
    steps: "1.- Descongelar\n2.- Cocinar",
    author: "nochi",
  },
  {
    id: 3,
    title: "Chorizo Simple",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400",
    prepareTime: 60,
    unitPrepareTime: "min",
    categoryId: 3,
    portions: 3,
    ingredients: "1 kg de pollo",
    steps: "1.- Descongelar\n2.- Cocinar",
    author: "yeglistar",
  },
  // Postres (categoryId: '1')
  {
    id: 4,
    title: "Tiramisú Clásico",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    prepareTime: 3,
    unitPrepareTime: "hrs",
    categoryId: 1,
    portions: 10,
    ingredients: "1 kg de pollo",
    steps: "1.- Descongelar\n2.- Cocinar",
    author: "yeglistar",
  },
  {
    id: 5,
    title: "Cheesecake de Fresas",
    image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400",
    prepareTime: 45,
    unitPrepareTime: "min",
    categoryId: 1,
    portions: 1,
    ingredients: "1 kg de pollo",
    steps: "1.- Descongelar\n2.- Cocinar",
    author: "yeglistar",
  },
];

const mockRecipesGroups = [
  {
    recipeId: 1,
    groupId: 2,
  },
  {
    recipeId: 1,
    groupId: 1,
  },
  {
    recipeId: 2,
    groupId: 1,
  },
  {
    recipeId: 3,
    groupId: 1,
  },
];

// Obtener recetas por categoría
export const getRecipesByCategory = async (
  categoryId: number
): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const recipesByCategory = mockRecipes
    .filter((recipe) => recipe.categoryId === categoryId)
    .sort((recipeA, recipeB) => recipeA.title.localeCompare(recipeB.title));
  return recipesByCategory;
};

export const getRecipes = async (): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // console.log("getRecipes", mockRecipes);
  return mockRecipes.sort((recipeA, recipeB) =>
    recipeA.title.localeCompare(recipeB.title)
  );
};

export const getRecipeById = async (id: number): Promise<Recipe | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRecipes.find((recipe) => recipe.id === id) || null;
};
export const getRecipesByUsername = async (
  username: string
): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRecipes
    .filter((recipe) => recipe.author === username)
    .sort((recipeA, recipeB) => recipeA.title.localeCompare(recipeB.title));
};

export const getRecipesByGroup = async (
  groupId: number
): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRecipesGroups
    .filter((recipeGroup) => recipeGroup.groupId === groupId)
    .map((recipeGroup) => mockRecipes.find(recipe => recipe.id === recipeGroup.recipeId)!)
    .sort((recipeA, recipeB) => recipeA.title.localeCompare(recipeB.title));
};

// TODO: Con API real:
// export const getRecipesByCategory = async (categoryId: string) => {
//   const response = await fetch(`https://tuapi.com/api/categories/${categoryId}/recipes`);
//   return await response.json();
// };
