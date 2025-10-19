import DynamicForm from "@/components/common/Form/DynamicForm/DynamicForm.component";
import { groupFormConfig } from "@/config";
import { User } from "@/entities";
import { authService, CreateGroupInput, groupService } from "@/services";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const defaultValues: CreateGroupInput = {
  title: "",
  description: "",
  author: "",
};

export default function CreateGroupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await authService.me();
    setUser(user);
  };

  const handleSubmit = async (data: CreateGroupInput) => {
    setIsLoading(true);
    try {
      const recipe = await groupService.createGroup({ ...data, author: user.username });

      if (recipe.id) {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Grupo creado",
          text2: "Se ha creado el grupo correctamente",
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
