import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { User } from "@/entities";
import { logout, me } from "@/services/auth/authServiceTest";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
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
    // setLoading(true);
    // try {
    //   const result = await getUserProfile();
    //   if (result.success) {
    //     setFirstName(result.data.firstName);
    //     setLastName(result.data.lastName);
    //     setEmail(result.data.email);
    //     setUsername(result.data.username);
    //     setAvatar(result.data.avatar);
    //   }
    // } catch (error) {
    //   console.error('Error cargando perfil:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  // const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status !== 'granted') {
  //     Alert.alert('Permisos necesarios', 'Necesitamos acceso a tus fotos');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.5,
  //   });

  //   if (!result.canceled) {
  //     setAvatar(result.assets[0].uri);
  //   }
  // };

  // const takePhoto = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== 'granted') {
  //     Alert.alert('Permisos necesarios', 'Necesitamos acceso a tu cámara');
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.5,
  //   });

  //   if (!result.canceled) {
  //     setAvatar(result.assets[0].uri);
  //   }
  // };

  // const showImageOptions = () => {
  //   Alert.alert(
  //     'Cambiar foto de perfil',
  //     'Elige una opción',
  //     [
  //       { text: 'Tomar foto', onPress: takePhoto },
  //       { text: 'Elegir de galería', onPress: pickImage },
  //       { text: 'Cancelar', style: 'cancel' }
  //     ]
  //   );
  // };
  const handleAbleUpdate = () => {
    console.log("ableUpdate", ableUpdate);
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
    //TODO: descomentar servicio de abajo y trycatch
    // await userService.updateUser(user.id, { ...user, password });
    // setLoading(false);
    // setAbleUpdate(false);
    // Alert.alert("Account updated", "Tu cuenta ha sido actualizada");
  };

  const handleConfirmUpdateAccount = () => {
    // Alert.alert("Eliminando cuenta", "Esta accion puede tardar unos minutos", [{ isPreferred: true }]);
    setLoading(true);
    //TODO: descomentar servicio de abajo y trycatch
    // await userService.deleteUser(user.id);
    Alert.alert("Account updated", "Tu cuenta ha sido actualizada");
    setLoading(false);
    handleAbleUpdate();
    // router.replace("/");
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
        onPress: () => handleConfirmDeleteAccount,
      },
    ]);
  };

  const handleConfirmDeleteAccount = async () => {
    // Alert.alert("Eliminando cuenta", "Esta accion puede tardar unos minutos", [{ isPreferred: true }]);
    setLoading(true);
    //TODO: descomentar servicio de abajo y trycatch
    // await userService.deleteUser(user.id);
    Alert.alert("Account deleted", "Tu cuenta ha sido eliminada");
    setLoading(false);
    router.replace("/");
  };
  const handleLogout = async () => {
    setLoading(true);
    //TODO: descomentar servicio de abajo y trycatch
    // await authService.logout();
    await logout();
    Alert.alert("Logout Sucessfully", "Se ha cerrado la seccion correctamente");
    setLoading(false);
    router.replace("/");
  };

  const handleViewMyRecipes = () => {
    router.push("/profile/my-cookbook" as Href);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header verde con imagen */}
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: user.avatar }} style={styles.profileImage} />
            {/* <TouchableOpacity 
                  style={styles.editButton}
                  //onPress={showImageOptions}
                > */}
            {/* <Ionicons name="pencil" size={20} color={theme.colors.textLight} /> */}
            {/* </TouchableOpacity> */}
          </View>
        </View>

        {/* Nombre completo */}
        <Text style={styles.fullName}>
          {user.firstName} {user.lastName}
        </Text>

        {/* Formulario */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput
              value={user.username}
              // onChangeText={(text) => handleChangeUser("username", text)}
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
                editable={ableUpdate}
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

          {/* Email */}
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

          {/* Password */}
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
