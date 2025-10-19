import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import Loading from "@/components/common/Loading/Loading.component";
import ProfileImage from "@/components/common/ProfileImage/ProfileImagen.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { User } from "@/entities";
import { authService, UpdateUserInput, userService } from "@/services";
import { me } from "@/services/auth/authServiceTest";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
// import CustomButtonCommon from 'components/common/CustomButtonCommon/CustomButtonCommon.component';

// const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [password, setPassword] = useState("************");
  const [ableUpdate, setAbleUpdate] = useState(false);
  // const [firstName, setFirstName] = useState("yegli");
  // const [lastName, setLastName] = useState("montanez");
  // const [email, setEmail] = useState("montanezyeglimar.hotmail.com");
  // const [password, setPassword] = useState("************");
  // const [username, setUsername] = useState("yegli_montanez");
  // const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400");

  useEffect(() => {
    loadUserData();
  }, []);

  const handleChangeUser = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const loadUserData = async () => {
    const user = await me();
    setUser(user);
  };

  const handleImageChange = (uri: string) => {
    setUser((prev) => ({ ...prev, avatar: uri }));
    console.log("New avatar URI:", uri);
    // TODO: Subir imagen al servidor
  };
  const handleAbleUpdate = () => {
    // console.log("ableUpdate", ableUpdate);
    setAbleUpdate(!ableUpdate);
  };

  const handleUpdate = async () => {
    Alert.alert("Update account", "¿Confirma actualizar los datos de tu cuenta?", [
      {
        text: "Cancelar",
        style: "cancel",
        onPress: () => handleAbleUpdate(),
      },
      {
        text: "Confirmar",
        style: "default",
        onPress: () => handleConfirmUpdateAccount(),
      },
    ]);
    // setLoading(true);
  };

  const handleConfirmUpdateAccount = async () => {
    setLoading(true);
    // console.log("New user:", { user, password });
    console.log("update", user, password);
    try {
      if (
        !user.lastName ||
        user.lastName.trim() === "" ||
        !user.firstName ||
        user.firstName.trim() === "" ||
        !user.username ||
        user.username.trim() === "" ||
        !user.email ||
        user.email.trim() === ""
      ) {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Datos incorrectos",
          text2: "Asegurese de haber ingresado todos sus datos",
          position: "bottom", // o 'top'
        });
        return;
      }

      if (!password || password.trim() === "") {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Datos incorrectos",
          text2: "Su contraseña no debe estar vacia",
          position: "bottom", // o 'top'
        });
        return;
      }
      const registerInput: UpdateUserInput = { ...user, password, avatar: "" };
      const userRegistered = await userService.updateUser(user.id, registerInput);
      console.log("userRegistered", userRegistered);
      if (userRegistered.id) {
        Toast.show({
          type: "success", // 'success', 'error', 'info'
          text1: "Se ha actualizado sus datos exitosamente",
          // text2: "Se le redireccionara al login...",
          position: "bottom", // o 'top'
        });
      } else {
        Toast.show({
          type: "error", // 'success', 'error', 'info'
          text1: "Datos incorrectos",
          text2: "Por favor, verifique que haya rellenado todos los datos.",
          position: "bottom", // o 'top'
        });
      }
    } catch (error) {
      Toast.show({
        type: "error", // 'success', 'error', 'info'
        text1: "Hubo un problema con su solicitud. ",
        text2: `Por favor, intentelo de nuevo mas tarde.`,
        position: "bottom", // o 'top'
      });
    }
    handleAbleUpdate();
    setLoading(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete account", "¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => handleConfirmDeleteAccount(),
      },
    ]);
  };

  const handleConfirmDeleteAccount = async () => {
    setLoading(true);
    // console.log("New user:", { user, password });
    try {
      await userService.deleteUser(user.id);
      Toast.show({
        type: "success", // 'success', 'error', 'info'
        text1: "Se ha eliminado su cuenta.",
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
  const handleLogout = async () => {
    setLoading(true);
    // console.log("New user:", { user, password });
    try {
      await authService.logout();
      Toast.show({
        type: "success", // 'success', 'error', 'info'
        text1: "Sesion cerrada correctamente.",
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

  const handleViewMyRecipes = () => {
    router.push("/profile/recipes" as Href);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ProfileImage imageUri={user.avatar} onImageChange={handleImageChange} size={120} editable={true} />
        </View>

        <Text style={styles.fullName}>
          {user.firstName} {user.lastName}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput
              value={user.username}
              style={styles.inputWithIcon}
              placeholder="Username"
              autoCapitalize="none"
              readOnly={true}
              editable={false}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <TextInput
                value={user.firstName}
                onChangeText={(text) => handleChangeUser("firstName", text)}
                style={styles.input}
                placeholder="Nombre"
                readOnly={!ableUpdate}
                editable={true}
              />
            </View>
            <View style={styles.halfInput}>
              <TextInput
                value={user.lastName}
                onChangeText={(text) => handleChangeUser("lastName", text)}
                style={styles.input}
                placeholder="Apellido"
                readOnly={!ableUpdate}
                editable={ableUpdate}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput
              value={user.email}
              onChangeText={(text) => handleChangeUser("email", text)}
              style={styles.inputWithIcon}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              readOnly={!ableUpdate}
              editable={ableUpdate}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.inputWithIcon}
              placeholder="Password"
              secureTextEntry
              readOnly={!ableUpdate}
              editable={ableUpdate}
            />
          </View>

          {!ableUpdate && <CustomButtonCommon title="Update Profile" onPress={handleAbleUpdate} icon="pencil-outline" />}
          {ableUpdate && <CustomButtonCommon title="Save" onPress={handleUpdate} icon="pencil-outline" />}
          {ableUpdate && <CustomButtonCommon title="Cancelar" onPress={handleAbleUpdate} icon="close-outline" />}

          {!ableUpdate && (
            <>
              <CustomButtonCommon title="My cookbook" onPress={handleViewMyRecipes} icon="reader-outline" />
              <CustomButtonCommon title="Logout" onPress={handleLogout} style={styles.deleteButton} icon="log-out-outline" />
              <CustomButtonCommon title="Delete account" onPress={handleDeleteAccount} style={styles.deleteButton} icon="trash-outline" />
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: theme.colors.primary,
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: theme.colors.surface,
    position: "absolute",
    bottom: -60,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  // editButton: {
  //   position: 'absolute',
  //   bottom: 5,
  //   right: 5,
  //   backgroundColor: theme.colors.primary,
  //   width: 36,
  //   height: 36,
  //   borderRadius: 18,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 2,
  //   borderColor: theme.colors.surface,
  // },
  fullName: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.textDark,
    textAlign: "center",
    marginTop: 70,
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  halfInput: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    paddingHorizontal: theme.spacing.md,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.textDark,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.textDark,
  },
  // button: {
  //   marginTop: theme.spacing.lg,
  // },
  myRecipesButton: {
    flexDirection: "row",
    backgroundColor: theme.colors.textPrimary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.large,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  myRecipesButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textLight,
  },
  deleteButton: {
    // flexDirection: "row",
    backgroundColor: theme.colors.error,
    // paddingVertical: theme.spacing.md,
    // borderRadius: theme.borderRadius.large,
    // alignItems: "center",
    // justifyContent: "center",
    // gap: theme.spacing.sm,
    // marginBottom: theme.spacing.xl,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textLight,
  },
  readOnlyInput: {
    color: "#000", // Color del texto visible
    fontSize: 16,
    borderWidth: 0, // Sin borde
    backgroundColor: "transparent", // Fondo transparente
    padding: 0, // Sin padding extra
  },
});
