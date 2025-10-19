// src/components/common/EditRecipeModal/EditRecipeModal.component.tsx
import { Recipe } from "@/entities";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import DynamicForm from "../Form/DynamicForm/DynamicForm.component";
import { recipeFormConfig } from "@/config";
import { CreateRecipeInput } from "@/services/recipe/types";
import { theme } from "@/styles/Theme";

interface EditRecipeModalProps {
  show: boolean;
  handleShow: () => void;
  recipe: Recipe;
  //onUpdate: (data: CreateRecipeInput) => Promise<void>;
}

export function EditRecipeModal({ 
  show, 
  handleShow, 
  recipe,
  //onUpdate 
}: Readonly<EditRecipeModalProps>) {
  const [loading, setLoading] = useState(false);

  // Convertir Recipe a CreateRecipeInput (valores iniciales)
  const defaultValues: CreateRecipeInput = {
    image: recipe.image || "",
    title: recipe.title || "",
    description: recipe.description || "",
    categoryId: recipe.categoryId || 0,
    prepareTime: recipe.prepareTime || 0,
    unitPrepareTime: recipe.unitPrepareTime || "minutes",
    portions: recipe.portions || 0,
    ingredients: recipe.ingredients || "",
    steps: recipe.steps || "",
  };

  const handleOnSubmit = async (data: CreateRecipeInput) => {
    setLoading(true);
    try {
      //await onUpdate(data);
      handleShow(); // Cerrar modal después de guardar
    } catch (error) {
      console.error("Error updating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      transparent 
      animationType="fade" 
      visible={show} 
      onRequestClose={handleShow} 
      presentationStyle="overFullScreen"
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={handleShow}>
        {/* Card - Detener cierre al tocar dentro */}
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.subtitle}>Edit Recipe</Text>
          
          <ScrollView 
            style={styles.formArea}
            showsVerticalScrollIndicator={false}
          >
            <DynamicForm
              config={recipeFormConfig}
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