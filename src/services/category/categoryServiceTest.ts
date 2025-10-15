import { Category } from "./types";


const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Postres',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
    recipeCount: 12,
  },
  {
    id: '2',
    name: 'Pastas',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    recipeCount: 8,
  },
  {
    id: '3',
    name: 'Carnes',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400',
    recipeCount: 15,
  },
  {
    id: '4',
    name: 'Ensaladas',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    recipeCount: 10,
  },
  {
    id: '5',
    name: 'Sopas',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    recipeCount: 6,
  },
  {
    id: '6',
    name: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400',
    recipeCount: 9,
  },
];

// Simula obtener categorías de la BD
export const getCategories = async (): Promise<Category[]> => {
  // Simula delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCategories;
};

// TODO: Cuando tengas API real:
// export const getCategories = async () => {
//   const response = await fetch('https://tuapi.com/api/categories');
//   return await response.json();
// };