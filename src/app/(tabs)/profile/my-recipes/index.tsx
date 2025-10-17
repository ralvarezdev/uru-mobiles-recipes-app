import Loading from "@/components/common/Loading/Loading.component";
import { ScreenContainer } from "@/components/common/ScreenContainer/ScreenContainer.component";
import { User } from "@/entities";
import { me } from "@/services/auth/authServiceTest";
import { theme } from "@/styles/Theme";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MyRecipesScreen() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({} as User);

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
});
