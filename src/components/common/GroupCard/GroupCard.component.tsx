import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ActionMenu } from "../ActionMenu/ActionMenu.component";
import { styles } from "./GroupCard.style";

type GroupCardProps = {
  title: string;
  recipesCount?: number;
  showActionMenu?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onPress?: () => void;
  testID?: string;
};

export const GroupCard: React.FC<GroupCardProps> = ({ title, recipesCount, showActionMenu, onEdit, onDelete, onPress, testID }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onMenuPress = (event: any) => {
    event.stopPropagation();
    setMenuVisible(true);
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      android_ripple={{ borderless: false }}
      accessibilityRole="button"
      accessibilityLabel={`Grupo ${title}`}
      accessibilityHint="Abre el detalle del grupo"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.row}>
        <View style={styles.texts}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {typeof recipesCount === "number" && (
            <Text style={styles.subtitle}>
              {recipesCount} {recipesCount === 1 ? "receta" : "recetas"}
            </Text>
          )}
        </View>

        {showActionMenu && (
          <>
            <Pressable
              hitSlop={10}
              onPress={onMenuPress}
              accessibilityRole="button"
              accessibilityLabel={`Más opciones para ${title}`}
              accessibilityHint="Abre el menú contextual"
              style={({ pressed }) => [styles.menuBtn, pressed && { opacity: 0.7 }]}>
              <MaterialIcons name="more-vert" size={22} color="#ECF3EE" />
            </Pressable>

            <ActionMenu
              show={menuVisible}
              onClose={() => setMenuVisible(false)}
              onEdit={() => {
                setMenuVisible(false);
                onEdit?.();
              }}
              onDelete={() => {
                setMenuVisible(false);
                onDelete?.();
              }}
            />
          </>
        )}
      </View>
    </Pressable>
  );
};
