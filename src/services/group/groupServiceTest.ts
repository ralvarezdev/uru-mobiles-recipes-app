import { Group } from "@/entities";


const mockGroups: Group[] = [
  { id: "1", title: "Personas con hambre", recipesCount: 13, author: 'yeglistar' },
  { id: "2", title: "Veganos felices", recipesCount: 8, author: 'yeglistar' },
  { id: "3", title: "Postres de domingo", recipesCount: 21, author: 'yeglistar' },
  { id: "4", title: "Cocina rápida", recipesCount: 5, author: 'nochi' },
  { id: "5", title: "Amantes del picante", recipesCount: 12, author: 'yeglistar' },
  { id: "6", title: "Cocina internacional", recipesCount: 7, author: 'nochi' },
  { id: "7", title: "Recetas familiares", recipesCount: 9, author: 'yeglistar' },
  { id: "8", title: "Cocina saludable", recipesCount: 15, author: 'nochi' },
];
export const getGroups = async (): Promise<Group[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGroups.sort((groupA, groupB) => groupA.title.localeCompare(groupB.title));
};
export const getGroupsByUsername = async (username:string): Promise<Group[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const userGroups = mockGroups.filter(group => group.author === username)
    .sort((groupA, groupB) => groupA.title.localeCompare(groupB.title))
  return userGroups;
};

// TODO: Cuando tengas API real:
// export const getCategories = async () => {
//   const response = await fetch('https://tuapi.com/api/categories');
//   return await response.json();
// };