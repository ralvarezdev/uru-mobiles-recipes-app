export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: number;
  categoryId: string;
  ingredients?: string[]; // Opcional
  //difficulty?: "Easy" | "Medium" | "Hard"; // Opcional
  description?: string; // Opcional
  steps?: { title?: string; content: string }[]; // Opcional
  servings?: number; // Opcional
  time?: string; // Opcional, por ejemplo "30 mins"
}
