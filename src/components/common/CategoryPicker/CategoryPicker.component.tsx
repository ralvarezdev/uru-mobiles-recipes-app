import React from "react";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./CategoryPicker.styles";

interface CategoryPickerProps {
  categories: { id: string; name: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export default function CategoryPicker({ categories, selectedValue, onValueChange, error }: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category</Text>
      <View style={[styles.pickerContainer, error && styles.pickerError]}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={styles.picker}>
          <Picker.Item label="Select a category..." value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}