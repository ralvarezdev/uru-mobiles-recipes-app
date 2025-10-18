import { View } from "@/components/Themed";
import { Recipe, User } from "@/entities";
import { me } from "@/services/auth/authServiceTest";
import { getRecipesByUsername } from "@/services/recipe/recipeServiceTest";
import { theme } from "@/styles/Theme";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import CustomButtonCommon from "../CustomButtonCommon/CustomButtonCommon.component";
import Loading from "../Loading/Loading.component";
import { RecipeList } from "../RecipeList/RecipeList.component";

interface AddRecipeToGroupModalProps {
  show: boolean;
  handleShow: () => void;
}

export function AddRecipeToGroupModal({ show, handleShow }: AddRecipeToGroupModalProps) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (user?.username) {
      loadRecipes(user.username);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const u = await me();
    setUser(u);
  };

  const loadRecipes = async (username: string) => {
    setLoading(true);
    const data = await getRecipesByUsername(username);
    setRecipes(data);
    setLoading(false);
  };

  const handleOnSave = () => {
    handleShow();
  };

  return (
    <Modal animationType="fade" visible={show} onRequestClose={handleShow} style={styles.modal}>
      <View style={mstyles.overlay}>
        <View style={mstyles.card}>
          {/* Contenido */}
          {loading ? (
            <Loading />
          ) : (
            <View style={mstyles.content}>
              <View style={mstyles.listArea}>
                <RecipeList recipes={recipes} selectable />
              </View>

              {/* Botones lado a lado */}
              <View style={mstyles.actionsRow}>
                <View style={mstyles.actionItem}>
                  <CustomButtonCommon title="Cancel" onPress={handleShow} />
                </View>
                <View style={mstyles.actionItem}>
                  <CustomButtonCommon title="Save" onPress={handleOnSave} />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: theme.colors.background,
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "92%",
    maxHeight: "82%",
    borderRadius: 16,
    overflow: "hidden",
    // Como usas Themed.View, el fondo lo da el theme. Si prefieres fijo:
    // backgroundColor: "#fff",
    // Sombra sutil
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  listArea: {
    flexGrow: 1,
    maxHeight: "70%",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  actionItem: {
    flex: 1,
  },
});
