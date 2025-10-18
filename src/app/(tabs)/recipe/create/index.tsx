import DynamicForm from "@/components/common/Form/DynamicForm/DynamicForm.component";
import { recipeFormConfig } from "@/config";
import { CreateRecipeInput } from "@/services/recipe/types";
import { Stack, router } from "expo-router";
import React, { useState } from "react";

export default function CreateRecipeScreen() {
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleSubmit = async (data: CreateRecipeInput) => {
    setIsLoading(true);
    try {
      //   console.log("Saving recipe:", data);
      // TODO: await createRecipe(data);

      // Simulación de API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.back();
    } catch (error) {
      console.error("Error saving recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCancel = () => {
  //   router.back();
  // };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Recipe",
          headerShown: false,
        }}
      />
      <DynamicForm
        config={recipeFormConfig}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isLoading={isLoading}

      />
    </>
  );
}
