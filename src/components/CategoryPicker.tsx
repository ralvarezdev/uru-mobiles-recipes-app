import { theme } from "@/styles/Theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

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

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerError: {
    borderColor: theme.colors.error || "#ff0000",
  },
  picker: {
    height: 50,
  },
  errorText: {
    color: theme.colors.error || "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
});
