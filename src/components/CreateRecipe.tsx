// screens/CreateRecipeScreen.tsx
//import { MOCK_CATEGORIES } from '@/constants/mockData';
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import CategoryPicker from "./CategoryPicker";
import CustomButtonCommon from "./common/CustomButtonCommon/CustomButtonCommon.component";
import SimpleTimeUnitPicker from "./SimpleTimeUnitPicker";
// import { createRecipe } from '@/services/recipe/recipeService';
const MOCK_CATEGORIES = [
  { id: "1", name: "Desserts" },
  { id: "2", name: "Pasta" },
  { id: "3", name: "Meat" },
  { id: "4", name: "Salads" },
  { id: "5", name: "Soups" },
  { id: "6", name: "Drinks" },
  { id: "7", name: "Snacks" },
  { id: "8", name: "Breakfast" },
];

export default function CreateRecipeScreen() {
  const { formData, errors, updateField, validateForm, resetForm } = useRecipeForm();

  const handleSave = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        console.log("Saving recipe:", formData);

        // Usa formData directamente - ya es CreateRecipeInput
        // await createRecipe(formData);

        router.back();
      } catch (error) {
        console.error("Error saving recipe:", error);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.imageSection}>
        <Ionicons name="camera-outline" size={48} color={theme.colors.gray400} />
        <Text style={styles.imageText}>Add picture</Text>
      </Pressable>

      <View style={styles.field}>
        <Text style={styles.label}>Recipe title</Text>
        <TextInput style={styles.input} value={formData.title} onChangeText={(text) => updateField("title", text)} placeholder="Value" />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => updateField("description", text)}
          placeholder="Enter description"
          multiline
          numberOfLines={3}
        />
        {errors.description && <Text style={styles.error}>{errors.description}</Text>}
      </View>

      <CategoryPicker
        categories={MOCK_CATEGORIES}
        selectedValue={formData.categoryId}
        onValueChange={(value) => updateField("categoryId", value)}
        error={errors.categoryId}
      />

      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Prepare time</Text>
          <View style={styles.timeRow}>
            <TextInput
              style={[styles.input, styles.numberInput]}
              value={formData.prepareTime > 0 ? formData.prepareTime.toString() : ""}
              onChangeText={(text) => {
                const number = parseInt(text) || 0;
                updateField("prepareTime", number);
              }}
              keyboardType="numeric"
              placeholder="60"
            />
            <Text style={styles.separator}>-</Text>
            <View style={styles.timeUnit}>
              <SimpleTimeUnitPicker selectedValue={formData.prepareTimeUnit} onValueChange={(value) => updateField("prepareTimeUnit", value)} />
            </View>
          </View>
          {errors.prepareTime && <Text style={styles.error}>{errors.prepareTime}</Text>}
        </View>

        <View style={styles.flex1}>
          <Text style={styles.label}>Portions</Text>
          <TextInput
            style={styles.input}
            value={formData.portions > 0 ? formData.portions.toString() : ""}
            onChangeText={(text) => {
              const number = parseInt(text) || 0;
              updateField("portions", number);
            }}
            keyboardType="numeric"
            placeholder="2"
          />
          {errors.portions && <Text style={styles.error}>{errors.portions}</Text>}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Ingredients</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.ingredients}
          onChangeText={(text) => updateField("ingredients", text)}
          placeholder="Enter ingredients"
          multiline
          numberOfLines={4}
        />
        {errors.ingredients && <Text style={styles.error}>{errors.ingredients}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Preparation steps</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.steps}
          onChangeText={(text) => updateField("steps", text)}
          placeholder="Enter preparation steps"
          multiline
          numberOfLines={4}
        />
        {errors.steps && <Text style={styles.error}>{errors.steps}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <CustomButtonCommon title="Cancel" onPress={handleCancel} />
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButtonCommon title="Save" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  imageSection: {
    height: 150,
    backgroundColor: theme.colors.gray200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  imageText: {
    marginTop: 8,
    color: theme.colors.gray400,
    fontSize: 14,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  numberInput: {
    flex: 1,
  },
  separator: {
    fontSize: 18,
    color: theme.colors.gray400,
  },
  timeUnit: {
    flex: 1.5,
  },
  error: {
    color: theme.colors.error || "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  buttonWrapper: {
    flex: 1,
  },
});

function useRecipeForm(): { formData: any; errors: any; updateField: any; validateForm: any; resetForm: any } {
  throw new Error("Function not implemented.");
}
