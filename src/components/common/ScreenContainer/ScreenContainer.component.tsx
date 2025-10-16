import React, { ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./ScreenContainer.style";

export const ScreenContainer = ({ children }: { children: ReactNode }) => <View style={styles.container}>{children}</View>;
