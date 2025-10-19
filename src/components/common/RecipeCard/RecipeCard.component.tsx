import { Recipe } from "@/entities";
import { recipeService } from "@/services";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { ActionMenu } from "../ActionMenu/ActionMenu.component";
import { EditRecipeModal } from "../EditRecipeModal/EditRecipeModal.component";
import { styles } from "./RecipeCard.style";

interface RecipeCardProps {
  recipe: Recipe;
  showActionMenu: boolean;
}

export default function RecipeCard({ recipe, showActionMenu }: Readonly<RecipeCardProps>) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const handleOnPress = () => {
    console.log(`${pathname}/${recipe.id}`);
    router.push({
      pathname: `${pathname}/${recipe.id}` as RelativePathString,
      params: { recipeTitle: recipe.title },
    });
  };
  const handleOnDelete = () => () => {
    Alert.alert("Delete recipe", "¿Estás seguro que deseas eliminar esta receta? Esta acción no se puede deshacer.", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => handleConfirmDeleteRecipe(),
      },
    ]);
  };

  const handleConfirmDeleteRecipe = async () => {
    setLoading(true);
    // console.log("New user:", { user, password });
    try {
      await recipeService.deleteRecipe(recipe.id);
      Toast.show({
        type: "success", // 'success', 'error', 'info'
        text1: "Se ha eliminado la receta.",
        // text2: "Se le redireccionara al login...",
        position: "bottom", // o 'top'
      });
      router.replace("/");
    } catch (error) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Hubo un problema con su solicitud. ",
        text2: `Por favor, intentelo de nuevo mas tarde.`,
        position: "bottom", // o 'top'
      });
    }
    setLoading(false);
  };

  const handleOnEdit = () => {
    handleShowModalEdit();
  };
  const actions = [
    // { text: "Add recipe", action: handleOnAddRecipe },
    { text: "Edit recipe", action: handleOnEdit },
    { text: "Delete recipe", action: handleOnDelete },
  ];

  const handleShowModalEdit = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <View style={styles.shadowWrap}>
      <TouchableOpacity style={styles.card} onPress={handleOnPress} activeOpacity={0.8}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>
          <View style={styles.info}>
            <Ionicons name="time-outline" size={16} color={theme.colors.textMuted} />
            <Text style={styles.time}>
              {recipe.prepareTime} {recipe.unitPrepareTime}
            </Text>
            <Ionicons name="person" size={16} color={theme.colors.textMuted} />
            <Text style={styles.time}>{recipe.author}</Text>
          </View>
        </View>
        <ActionMenu show={showActionMenu} actions={actions} optionIconColor={"fff"} iconStyle={{ bottom: -80, left: -10 }} />
        {showEditModal && (
          <EditRecipeModal
            show={showEditModal}
            handleShow={handleShowModalEdit}
            recipe={recipe}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
