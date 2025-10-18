import { Group, Recipe, User } from "@/entities";
import { me } from "@/services/auth/authServiceTest";
import { getRecipesByUsername } from "@/services/recipe/recipeServiceTest";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import CustomButtonCommon from "../CustomButtonCommon/CustomButtonCommon.component";
import Loading from "../Loading/Loading.component";
import { RecipeList } from "../RecipeList/RecipeList.component";

interface AddRecipeToGroupModalProps {
  show: boolean;
  handleShow: () => void;
  group: Group;
}

export function AddRecipeToGroupModal({ show, handleShow, group }: Readonly<AddRecipeToGroupModalProps>) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      const u = await me();
      setUser(u);
    })();
  }, []);

  useEffect(() => {
    if (!user?.username) return;
    (async () => {
      setLoading(true);
      const data = await getRecipesByUsername(user.username);
      setRecipes(data);
      setLoading(false);
    })();
  }, [user]);

  const handleOnSave = () => {
    // aquí podrías devolver ids seleccionados si los necesitas
    handleShow();
  };

  return (
    <Modal transparent animationType="fade" visible={show} onRequestClose={handleShow} presentationStyle="overFullScreen">
      {/* Overlay fuera de Themed.View para no heredar fondo */}
      <Pressable style={styles.overlay} onPress={handleShow}>
        {/* Detener cierre al tocar dentro de la tarjeta */}
        <Pressable style={styles.card} onPress={() => {}}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <View style={styles.listArea}>
                <RecipeList
                  recipes={recipes}
                  selectable
                  showActionMenu={false}
                  listHeaderComponent={<Text style={styles.subtitle}>Agregar recetas al grupo {group.title}</Text>}
                />
              </View>

              <View style={styles.actionsRow}>
                <View style={styles.actionItem}>
                  <CustomButtonCommon title="Cancel" onPress={handleShow} />
                </View>
                <View style={styles.actionItem}>
                  <CustomButtonCommon title="Save" onPress={handleOnSave} />
                </View>
              </View>
            </>
          )}
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
    marginBottom: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)", // semitransparente real
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "92%",
    maxHeight: "80%",
    // Fondo explícito: evita “pantalla negra” en dark theme
    backgroundColor: "#fff", // o theme.colors.surface si tienes uno claro garantizado
    borderRadius: 16,
    padding: 16,
    // Sombra
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  listArea: {
    maxHeight: "90%", // evita que tape toda la pantalla
    marginBottom: 12,
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
