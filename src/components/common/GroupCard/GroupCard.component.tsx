import { Group } from "@/entities";
import { MaterialIcons } from "@expo/vector-icons";
import { RelativePathString, router, usePathname } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ActionMenu } from "../ActionMenu/ActionMenu.component";
import { styles } from "./GroupCard.style";

type GroupCardProps = {
  group: Group;
  // title: string;
  // recipesCount?: number;
  showActionMenu?: boolean;
  // testID?: string;
};

export const GroupCard: React.FC<GroupCardProps> = ({ group, showActionMenu }) => {
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onMenuPress = (event: any) => {
    event.stopPropagation();
    setMenuVisible(true);
  };

  const handleOnPress = () => {
    router.push({
      pathname: `${pathname}/${group.id}` as RelativePathString,
      params: { groupTitle: group.title },
    });
  };

  // const handleOnPress = () => {
  //   console.log(`${pathname}/${recipe.id}`);
  //   router.push({
  //     pathname: `${pathname}/${recipe.id}` as RelativePathString,
  //     params: { recipeTitle: recipe.title },
  //   });
  // };

  const handleOnEdit = () => {
    setMenuVisible(false);
    // onEdit?.();
  };

  const handleOnDelete = () => {
    setMenuVisible(false);
    // onEdit?.();
  };
  const handleOnClose = () => {
    setMenuVisible(false);
  };

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

        {showActionMenu && (
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
        )}
      </View>
    </Pressable>
  );
};
