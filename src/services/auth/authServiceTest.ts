import { User } from "@/entities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginInput, LoginResponse } from "./types";


export const mockUsers: (User & {password:string})[] = [
  {
    id: 1,
    firstName: "Carlos",
    lastName: "Pérez",
    username: "cperez",
    email: "carlos.perez@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    password: "Password123!",
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González",
    username: "mgonzalez",
    email: "maria.gonzalez@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    password: "SecurePass456!",
  },
  {
    id: 3,
    firstName: "David",
    lastName: "Flores",
    username: "nochi",
    email: "nochi@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    password: "nochi",
  },
  {
    id: 4,
    firstName: "Yeglimar",
    lastName: "Montanez",
    username: "yeglistar",
    email: "yeglistar@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    password: "yeglistar",
  },
  {
    id: 5,
    firstName: "Javier",
    lastName: "Reyes",
    username: "jreyes",
    email: "javier.reyes@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    password: "Reyes789@",
  },
  {
    id: 6,
    firstName: "Camila",
    lastName: "López",
    username: "clopez",
    email: "camila.lopez@example.com",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    password: "Camila2025$",
  },
  {
    id: 7,
    firstName: "Tomás",
    lastName: "Vargas",
    username: "tvargas",
    email: "tomas.vargas@example.com",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    password: "VargasSecure!",
  },
  {
    id: 8,
    firstName: "Valentina",
    lastName: "Rojas",
    username: "vrojas",
    email: "valentina.rojas@example.com",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    password: "Valentina123#",
  },
  {
    id: 9,
    firstName: "Felipe",
    lastName: "Castro",
    username: "fcastro",
    email: "felipe.castro@example.com",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    password: "CastroPass!",
  },
  {
    id: 10,
    firstName: "Sofía",
    lastName: "Navarro",
    username: "snavarro",
    email: "sofia.navarro@example.com",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    password: "Sofia789*",
  },
];

export const login = async (input: LoginInput): Promise<LoginResponse> => {
    const response = mockUsers.find(u => u.email.toLowerCase() === input.email.toLowerCase() && u.password === input.password);
    if (!response) {
      throw new Error("No hay respuesta");
    }
    const {password, ...user} = response;
    const accessToken = Math.random().toString(36).substring(2, 2 + 30);
    const refreshToken = Math.random().toString(36).substring(2, 2 + 30);
    // console.log('accessToken',accessToken);
    // console.log('refreshToken',refreshToken);
    const loginResponse: LoginResponse = {
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken
      },
      user: user as User
    };
    await AsyncStorage.setItem("authenticatedUser", JSON.stringify(user));
    return loginResponse;
};

export const me = async (): Promise<User> => {
    // const user = mockUsers.find(u => u.email.toLowerCase() === input.email.toLowerCase());
    const jsonUser = await AsyncStorage.getItem("authenticatedUser");

    if (!jsonUser) {
      throw new Error("No hay respuesta");
    }

    const user = JSON.parse(jsonUser);
    return user;
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem("authenticatedUser");
};