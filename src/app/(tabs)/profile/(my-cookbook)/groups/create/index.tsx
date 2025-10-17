import DynamicForm from "@/components/common/Form/DynamicForm/DynamicForm.component";
import { groupFormConfig } from "@/config";
import { CreateGroupInput } from "@/services";
import { router, Stack } from "expo-router";
import React, { useState } from "react";

export default function CreateGroupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: CreateGroupInput = {
    title: "",
    description: "",
  };

  const handleSubmit = async (data: CreateGroupInput) => {
    setIsLoading(true);
    try {
      // console.log('Saving group:', data);
      // TODO: await createGroup(data);

      // Simulación de API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.back();
    } catch (error) {
      console.error("Error saving group:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Add new group",
          headerShown: true,
        }}
      />
      <DynamicForm
        config={groupFormConfig}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isLoading={isLoading}
      />
    </>
  );
}
