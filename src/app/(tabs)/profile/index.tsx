import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import CustomButtonCommon from 'components/common/CustomButtonCommon/CustomButtonCommon.component';

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("yegli");
  const [lastName, setLastName] = useState("montanez");
  const [email, setEmail] = useState("montanezyeglimar.hotmail.com");
  const [password, setPassword] = useState("************");
  const [username, setUsername] = useState("yegli_montanez");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
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

  const handleUpdate = async () => {
    //setLoading(true);
    // try {
    //   const result = await updateUserProfile({
    //     firstName,
    //     lastName,
    //     email,
    //     username,
    //     avatar,
    //   });
    //   if (result.success) {
    //     Alert.alert('Éxito', 'Perfil actualizado correctamente');
    //   }
    // } catch (error) {
    //   console.error('Error actualizando perfil:', error);
    //   Alert.alert('Error', 'No se pudo actualizar el perfil');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleDeleteAccount = () => {
    Alert.alert("Eliminar cuenta", "¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          // TODO: Aquí irá la llamada a la API para eliminar la cuenta
          console.log("Eliminando cuenta...");
          Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada");
          // Redirigir al login o welcome screen
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header verde con imagen */}
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: avatar }} style={styles.profileImage} />
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
          {firstName} {lastName}
        </Text>

        {/* Formulario */}
        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} placeholder="Nombre" />
            </View>
            <View style={styles.halfInput}>
              <TextInput value={lastName} onChangeText={setLastName} style={styles.input} placeholder="Apellido" />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputWithIcon}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput value={password} onChangeText={setPassword} style={styles.inputWithIcon} placeholder="Password" secureTextEntry />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={theme.colors.textMuted} style={styles.icon} />
            <TextInput
              value={username}
              //onChangeText={setUsername}
              style={styles.inputWithIcon}
              placeholder="Username"
              autoCapitalize="none"
            />
          </View>

          <CustomButtonCommon title="Update Profile" onPress={handleUpdate} style={styles.button} />

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Ionicons name="trash-outline" size={20} color={theme.colors.textLight} />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
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
  button: {
    marginTop: theme.spacing.lg,
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.large,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textLight,
  },
});
