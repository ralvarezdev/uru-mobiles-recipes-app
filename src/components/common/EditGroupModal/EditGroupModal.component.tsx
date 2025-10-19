// src/components/common/EditRecipeModal/EditRecipeModal.component.tsx
import { groupFormConfig } from "@/config";
import { Group, User } from "@/entities";
import { authService, groupService, UpdateGroupInput } from "@/services";
import { theme } from "@/styles/Theme";
import { FormConfig } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import DynamicForm from "../Form/DynamicForm/DynamicForm.component";
import Loading from "../Loading/Loading.component";

interface EditRecipeModalProps {
  show: boolean;
  handleShow: () => void;
  group: Group;
  //onUpdate: (data: CreateRecipeInput) => Promise<void>;
}

export function EditGroupModal({
  show,
  handleShow,
  group,
}: //onUpdate
Readonly<EditRecipeModalProps>) {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await authService.me();
    setUser(user);
  };

  // Convertir Recipe a CreateRecipeInput (valores iniciales)
  const defaultValues: UpdateGroupInput = {
    id: 0,
    title: "",
    description: "",
    author: "",
  };

  const handleOnSubmit = async (data: UpdateGroupInput) => {
    setLoading(true);
    try {
      const recipeResponse = await groupService.updateGroup(group.id, { ...data, author: user.username });

      if (recipeResponse.id) {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Groupo actualizada",
          text2: "Se ha actualizado la reeta correctamente",
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
    setLoading(true);
    // setLoading(true);
    // try {
    //   //await onUpdate(data);
    //   handleShow(); // Cerrar modal después de guardar
    // } catch (error) {
    //   console.error("Error updating recipe:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Modal transparent animationType="fade" visible={show} onRequestClose={handleShow} presentationStyle="overFullScreen">
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={handleShow}>
        {/* Card - Detener cierre al tocar dentro */}
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.subtitle}>Edit Group</Text>

          <ScrollView style={styles.formArea} showsVerticalScrollIndicator={false}>
            <DynamicForm
              config={groupFormConfig as FormConfig<UpdateGroupInput>}
              defaultValues={defaultValues}
              onSubmit={handleOnSubmit}
              onCancel={handleShow}
              isLoading={loading}
            />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#365C49",
    marginBottom: 16,
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "92%",
    maxHeight: "90%",
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  formArea: {
    maxHeight: "85%",
  },
});
