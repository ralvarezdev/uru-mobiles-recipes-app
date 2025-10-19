import DynamicForm from "@/components/common/Form/DynamicForm/DynamicForm.component";
import { recipeFormConfig } from "@/config";
import { User } from "@/entities";
import { authService, recipeService } from "@/services";
import { CreateRecipeInput } from "@/services/recipe/types";
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const defaultValues: CreateRecipeInput = {
  image: "",
  title: "",
  description: "",
  categoryId: 0,
  prepareTime: 0,
  unitPrepareTime: "minutes",
  portions: 0,
  ingredients: "",
  steps: "",
  author: "",
};

export default function CreateRecipeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await authService.me();
    setUser(user);
  };

  const handleSubmit = async (data: CreateRecipeInput) => {
    setIsLoading(true);
    try {
      const recipe = await recipeService.createRecipe({ ...data, author: user.username });

      if (recipe.id) {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Receta creada",
          text2: "Se ha creado la reeta correctamente",
          position: "bottom", // o 'top'
        });
        router.back();
      } else {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Datos incorrectos",
          text2: "Por favor, verifique que haya rellenado todos los datos.",
          position: "bottom", // o 'top'
        });
      }

      // router.back();
    } catch (error) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Hubo un problema con su solicitud. ",
        text2: `Por favor, intentelo de nuevo mas tarde.`,
        position: "bottom", // o 'top'
      });
    }
    setIsLoading(true);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Recipe",
          headerShown: false,
        }}
      />
      <DynamicForm config={recipeFormConfig} defaultValues={defaultValues} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
    </>
  );
}
