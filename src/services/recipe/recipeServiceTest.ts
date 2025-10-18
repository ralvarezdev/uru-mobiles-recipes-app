import { Recipe } from "@/entities/Recipe";

// Mock de recetas por categoría
const mockRecipes: Recipe[] = [
  // Carnes (categoryId: 3)
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

  // Postres (categoryId: 1)
  {
    id: 4,
    title: "Tiramisú Clásico",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    prepareTime: 3,
    unitPrepareTime: "hrs",
    categoryId: 1,
    portions: 10,
    ingredients: "500 g mascarpone, 200 g galletas, café, cacao",
    steps: "1.- Batir ingredientes\n2.- Armar capas\n3.- Refrigerar",
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
    ingredients: "Queso crema, galletas, mantequilla, fresas frescas",
    steps: "1.- Preparar base\n2.- Batir mezcla\n3.- Hornear y enfriar",
    author: "yeglistar",
  },
  {
    id: 6,
    title: "Brownies de Chocolate",
    image: "https://images.unsplash.com/photo-1601972599720-bc61b1a9a3e1?w=400",
    prepareTime: 50,
    unitPrepareTime: "min",
    categoryId: 1,
    portions: 8,
    ingredients: "200 g de chocolate, mantequilla, harina, azúcar",
    steps: "1.- Derretir chocolate\n2.- Mezclar\n3.- Hornear",
    author: "nochi",
  },

  // Pastas (categoryId: 2)
  {
    id: 7,
    title: "Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
    prepareTime: 25,
    unitPrepareTime: "min",
    categoryId: 2,
    portions: 2,
    ingredients: "Pasta, panceta, huevos, queso parmesano",
    steps: "1.- Cocinar pasta\n2.- Mezclar con salsa y servir",
    author: "yeglistar",
  },
  {
    id: 8,
    title: "Lasaña Boloñesa",
    image: "https://images.unsplash.com/photo-1608759264552-018f6d36e33b?w=400",
    prepareTime: 90,
    unitPrepareTime: "min",
    categoryId: 2,
    portions: 6,
    ingredients: "Láminas de lasaña, carne molida, bechamel, queso",
    steps: "1.- Preparar salsa\n2.- Armar capas\n3.- Hornear",
    author: "nochi",
  },

  // Pescados (categoryId: 4)
  {
    id: 9,
    title: "Salmón al Horno con Limón",
    image: "https://images.unsplash.com/photo-1604908176997-87e50e6c2a7b?w=400",
    prepareTime: 35,
    unitPrepareTime: "min",
    categoryId: 4,
    portions: 2,
    ingredients: "Filetes de salmón, limón, mantequilla, eneldo",
    steps: "1.- Marinar\n2.- Hornear\n3.- Servir caliente",
    author: "yeglistar",
  },
  {
    id: 10,
    title: "Ceviche de Reineta",
    image: "https://images.unsplash.com/photo-1617196034796-73f8f69a52ea?w=400",
    prepareTime: 25,
    unitPrepareTime: "min",
    categoryId: 4,
    portions: 3,
    ingredients: "Reineta, limón, cebolla, cilantro, ají",
    steps: "1.- Cortar ingredientes\n2.- Marinar en limón\n3.- Servir frío",
    author: "nochi",
  },

  // Ensaladas (categoryId: 5)
  {
    id: 11,
    title: "Ensalada César",
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400",
    prepareTime: 15,
    unitPrepareTime: "min",
    categoryId: 5,
    portions: 2,
    ingredients: "Lechuga, pollo, crutones, parmesano, aderezo",
    steps: "1.- Lavar ingredientes\n2.- Mezclar con aderezo\n3.- Servir",
    author: "yeglistar",
  },
  {
    id: 12,
    title: "Ensalada de Quinoa",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
    prepareTime: 20,
    unitPrepareTime: "min",
    categoryId: 5,
    portions: 4,
    ingredients: "Quinoa, tomate cherry, pepino, limón",
    steps: "1.- Cocer quinoa\n2.- Mezclar ingredientes\n3.- Servir frío",
    author: "nochi",
  },

  // Bebidas (categoryId: 6)
  {
    id: 13,
    title: "Jugo Natural de Mango",
    image: "https://images.unsplash.com/photo-1600271886274-5d1e86c6f82a?w=400",
    prepareTime: 10,
    unitPrepareTime: "min",
    categoryId: 6,
    portions: 2,
    ingredients: "Mango, agua, azúcar, hielo",
    steps: "1.- Licuar todo\n2.- Servir frío",
    author: "nochi",
  },
  {
    id: 14,
    title: "Limonada con Hierbabuena",
    image: "https://images.unsplash.com/photo-1620490367474-5c8e0d44a7b0?w=400",
    prepareTime: 8,
    unitPrepareTime: "min",
    categoryId: 6,
    portions: 2,
    ingredients: "Limón, hierbabuena, azúcar, agua fría",
    steps: "1.- Licuar\n2.- Colar\n3.- Servir con hielo",
    author: "yeglistar",
  },
  // Adicionales
  {
    id: 15,
    title: "Panqueques con Miel y Frutas",
    image: "https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=400",
    prepareTime: 25,
    unitPrepareTime: "min",
    categoryId: 1, // Postres
    portions: 3,
    ingredients: "Harina, leche, huevos, miel, frutas frescas",
    steps:
      "1.- Mezclar masa\n2.- Cocinar panqueques\n3.- Servir con frutas y miel",
    author: "yeglistar",
  },
  {
    id: 16,
    title: "Pollo al Curry con Arroz",
    image: "https://images.unsplash.com/photo-1604908812144-43df0a1b8d2d?w=400",
    prepareTime: 50,
    unitPrepareTime: "min",
    categoryId: 3, // Carnes
    portions: 4,
    ingredients: "Pechugas de pollo, curry, crema, arroz jazmín",
    steps: "1.- Cocinar pollo con curry\n2.- Servir con arroz blanco",
    author: "nochi",
  },
  {
    id: 17,
    title: "Ravioles de Espinaca y Ricotta",
    image: "https://images.unsplash.com/photo-1603133872972-4a05bdeed51a?w=400",
    prepareTime: 60,
    unitPrepareTime: "min",
    categoryId: 2, // Pastas
    portions: 2,
    ingredients: "Masa fresca, ricotta, espinaca, salsa de tomate",
    steps: "1.- Preparar relleno\n2.- Armar ravioles\n3.- Cocinar y servir",
    author: "yeglistar",
  },
  {
    id: 18,
    title: "Sopa de Zapallo Casera",
    image: "https://images.unsplash.com/photo-1601050690597-89d26e65a162?w=400",
    prepareTime: 40,
    unitPrepareTime: "min",
    categoryId: 7, // Sopas
    portions: 5,
    ingredients: "Zapallo, cebolla, ajo, caldo de verduras, crema",
    steps: "1.- Cocinar zapallo\n2.- Licuar\n3.- Servir caliente con crema",
    author: "nochi",
  },
  {
    id: 19,
    title: "Smoothie Verde Detox",
    image: "https://images.unsplash.com/photo-1605478031169-ecdadc5e59c9?w=400",
    prepareTime: 5,
    unitPrepareTime: "min",
    categoryId: 6, // Bebidas
    portions: 1,
    ingredients: "Espinaca, manzana verde, jengibre, limón, agua",
    steps: "1.- Licuar todos los ingredientes\n2.- Servir frío",
    author: "yeglistar",
  },
];

const mockRecipesGroups = [
  { recipeId: 1, groupId: 2 },
  { recipeId: 1, groupId: 1 },
  { recipeId: 2, groupId: 1 },
  { recipeId: 3, groupId: 1 },
  { recipeId: 1, groupId: 6 },
  { recipeId: 5, groupId: 6 },
  { recipeId: 2, groupId: 6 },
  { recipeId: 3, groupId: 6 },
  { recipeId: 4, groupId: 3 },
  { recipeId: 5, groupId: 2 },
  { recipeId: 6, groupId: 4 },
  { recipeId: 7, groupId: 5 },
  { recipeId: 8, groupId: 3 },
  { recipeId: 9, groupId: 2 },
  { recipeId: 10, groupId: 7 },
  { recipeId: 11, groupId: 8 },
  { recipeId: 12, groupId: 1 },
  { recipeId: 13, groupId: 4 },
  { recipeId: 14, groupId: 5 },
  { recipeId: 15, groupId: 8 },
  { recipeId: 6, groupId: 2 },
  { recipeId: 7, groupId: 1 },
  { recipeId: 8, groupId: 6 },
  { recipeId: 9, groupId: 7 },
  { recipeId: 10, groupId: 3 },
  { recipeId: 11, groupId: 5 },
  { recipeId: 12, groupId: 4 },
  { recipeId: 13, groupId: 6 },
  { recipeId: 14, groupId: 8 },
  { recipeId: 15, groupId: 7 },
  { recipeId: 2, groupId: 2 },
  { recipeId: 3, groupId: 3 },
  { recipeId: 4, groupId: 4 },
  { recipeId: 5, groupId: 5 },
  { recipeId: 6, groupId: 6 },
  { recipeId: 7, groupId: 7 },
  { recipeId: 8, groupId: 8 },
  { recipeId: 9, groupId: 1 },
  { recipeId: 10, groupId: 2 },
  { recipeId: 11, groupId: 3 },
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

export const getRecipesByGroup = async (groupId: number): Promise<Recipe[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRecipesGroups
    .filter((recipeGroup) => recipeGroup.groupId === groupId)
    .map(
      (recipeGroup) =>
        mockRecipes.find((recipe) => recipe.id === recipeGroup.recipeId)!
    )
    .sort((recipeA, recipeB) => recipeA.title.localeCompare(recipeB.title));
};

// TODO: Con API real:
// export const getRecipesByCategory = async (categoryId: string) => {
//   const response = await fetch(`https://tuapi.com/api/categories/${categoryId}/recipes`);
//   return await response.json();
// };
