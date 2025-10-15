import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./GroupCard.style";

type GroupCardProps = {
  title: string;
  recipesCount?: number;
  onPress?: () => void;
  onMenuPress?: () => void;
  disabled?: boolean;
  testID?: string;
};

export const GroupCard: React.FC<GroupCardProps> = ({ title, recipesCount, onPress, onMenuPress, disabled = false, testID }) => {
  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ borderless: false }}
      accessibilityRole="button"
      accessibilityLabel={`Grupo ${title}`}
      accessibilityHint="Abre el detalle del grupo"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed, disabled && styles.cardDisabled]}>
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

        <Pressable
          hitSlop={10}
          onPress={onMenuPress}
          accessibilityRole="button"
          accessibilityLabel={`Más opciones para ${title}`}
          accessibilityHint="Abre el menú contextual"
          style={({ pressed }) => [styles.menuBtn, pressed && { opacity: 0.7 }]}>
          <MaterialIcons name="more-vert" size={22} color="#ECF3EE" />
        </Pressable>
      </View>
    </Pressable>
  );
};
