import { Group } from "@/entities";
import { groupService } from "@/services";
import { RelativePathString, router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { ActionMenu } from "../ActionMenu/ActionMenu.component";
import { AddRecipeToGroupModal } from "../AddRecipeToGroup/AddRecipeToGroupModal.component";
import { EditGroupModal } from "../EditGroupModal/EditGroupModal.component";
import Loading from "../Loading/Loading.component";
import { styles } from "./GroupCard.style";

type GroupCardProps = {
  group: Group;
  // title: string;
  // recipesCount?: number;
  showActionMenu: boolean;
  // testID?: string;
};

export const GroupCard: React.FC<GroupCardProps> = ({ group, showActionMenu }) => {
  const pathname = usePathname();
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalAddRecipeToGroup, setShowModalAddRecipeToGroup] = React.useState(false);
  // const [menuVisible, setMenuVisible] = React.useState(false);

  // const onMenuPress = (event: any) => {
  //   event.stopPropagation();
  //   setMenuVisible(true);
  // };

  const handleOnPress = () => {
    router.push({
      pathname: `${pathname}/${group.id}` as RelativePathString,
      params: { groupTitle: group.title },
    });
  };

  const handleShowModalAddRecipeToGroup = () => {
    setShowModalAddRecipeToGroup(!showModalAddRecipeToGroup);
  };

  // const handleOnPress = () => {
  //   console.log(`${pathname}/${recipe.id}`);
  //   router.push({
  //     pathname: `${pathname}/${recipe.id}` as RelativePathString,
  //     params: { recipeTitle: recipe.title },
  //   });
  // };

  const handleOnAddRecipe = () => {
    // setMenuVisible(false);
    // onEdit?.();
    handleShowModalAddRecipeToGroup();
  };

  const handleOnEdit = () => {
    handleShowModalEdit();
  };

  const handleShowModalEdit = () => {
    setShowEditModal(!showEditModal);
  };

  const handleOnDelete = () => () => {
    Alert.alert("Delete group", "¿Estás seguro que deseas eliminar este grupo? Se eliminaran todas las recetas asociadas a este grupo.", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => handleConfirmDeleteGroup(),
      },
    ]);
  };

  const handleConfirmDeleteGroup = async () => {
    setLoading(true);
    // console.log("New user:", { user, password });
    try {
      await groupService.deleteGroup(group.id);
      Toast.show({
        type: "success", // 'success', 'error', 'info'
        text1: "Se ha eliminado el grupo.",
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
  // const handleOnClose = () => {
  //   setMenuVisible(false);
  // };

  const actions = [
    { text: "Add recipe", action: handleOnAddRecipe },
    { text: "Edit group", action: handleOnEdit },
    { text: "Delete group", action: handleOnDelete },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <Pressable
      testID={`group-card-${group.id}`}
      onPress={handleOnPress}
      android_ripple={{ borderless: false }}
      accessibilityRole="button"
      accessibilityLabel={`Grupo ${group.title}`}
      accessibilityHint="Abre el detalle del grupo"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.row}>
        <View style={styles.texts}>
          <Text style={styles.title} numberOfLines={1}>
            {group.title}
          </Text>
          {typeof group.recipesCount === "number" && (
            <Text style={styles.subtitle}>
              {group.recipesCount} {group.recipesCount === 1 ? "receta" : "recetas"}
            </Text>
          )}
        </View>
        <ActionMenu show={showActionMenu} actions={actions} iconStyle={{}} />

        {showActionMenu && <AddRecipeToGroupModal show={showModalAddRecipeToGroup} handleShow={handleShowModalAddRecipeToGroup} group={group} />}

        {showEditModal && <EditGroupModal show={showEditModal} handleShow={handleShowModalEdit} group={group} />}
        {/* {showActionMenu && (
          <>
            <Pressable
              hitSlop={10}
              onPress={onMenuPress}
              accessibilityRole="button"
              accessibilityLabel={`Más opciones para ${group.title}`}
              accessibilityHint="Abre el menú contextual"
              style={({ pressed }) => [styles.menuBtn, pressed && { opacity: 0.7 }]}>
              <MaterialIcons name="more-vert" size={22} color="#ECF3EE" />
            </Pressable>

            <ActionMenu show={menuVisible} onClose={handleOnClose} onEdit={handleOnEdit} onDelete={handleOnDelete} />
          </>
        )} */}
      </View>
    </Pressable>
  );
};
