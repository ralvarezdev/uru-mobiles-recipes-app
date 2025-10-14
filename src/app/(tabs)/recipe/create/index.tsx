import React from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from "react-native";
import { useValidatorRecipeForm } from "@/hooks/useValidatorRecipeForm";
import { Stack, router } from "expo-router";
import { theme } from "@/styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import CustomButtonCommon from "@/components/common/CustomButtonCommon/CustomButtonCommon.component";

const MOCK_CATEGORIES = [
  { id: 1, name: "Desserts" },
  { id: 2, name: "Pasta" },
  { id: 3, name: "Meat" },
  { id: 4, name: "Salads" },
];

export default function CreateRecipeScreen() {
  const { formData, errors, updateField, validateForm, resetForm } = useValidatorRecipeForm();

  const handleSave = () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("Saving recipe:", formData);
      // TODO: await createRecipe(formData);
      router.back();
    }
  };

  const handleCancel = () => {
    resetForm();
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Recipe",
          headerShown: false,
        }}
      />

      <ScrollView style={styles.container}>
        <Pressable style={styles.imageSection}>
          <Ionicons name="camera-outline" size={64} color="#6B8E7F" />
          <Text style={styles.imageText}>Add picture</Text>
        </Pressable>

        <View style={styles.field}>
          <Text style={styles.label}>Recipe title</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => updateField("title", text)}
            placeholder="Enter title"
            placeholderTextColor="#999"
          />
          {errors.title && <Text style={styles.error}>{errors.title}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => updateField("description", text)}
            placeholder="Enter description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
          {errors.description && <Text style={styles.error}>{errors.description}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={formData.categoryId} onValueChange={(value) => updateField("categoryId", value)} style={styles.picker}>
              <Picker.Item label="Select category..." value={0} />
              {MOCK_CATEGORIES.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
          {errors.categoryId && <Text style={styles.error}>{errors.categoryId}</Text>}
        </View>

        <View style={styles.row}>
          <View style={styles.timeContainer}>
            <Text style={styles.label}>Prepare time</Text>
            <View style={styles.timeInputRow}>
              <TextInput
                style={styles.numberInput}
                value={formData.prepareTime > 0 ? formData.prepareTime.toString() : ""}
                onChangeText={(text) => updateField("prepareTime", parseInt(text) || 0)}
                keyboardType="numeric"
                placeholder="60"
                placeholderTextColor="#999"
              />
              <Text style={styles.separator}>-</Text>
              <View style={styles.timePickerWrapper}>
                <Picker
                  selectedValue={formData.unitPrepareTime}
                  onValueChange={(value) => updateField("unitPrepareTime", value)}
                  style={styles.timePicker}>
                  <Picker.Item label="minutes" value="minutes" />
                  <Picker.Item label="hours" value="hours" />
                  <Picker.Item label="seconds" value="seconds" />
                </Picker>
              </View>
            </View>
            {errors.prepareTime && <Text style={styles.error}>{errors.prepareTime}</Text>}
          </View>

          <View style={styles.portionsContainer}>
            <Text style={styles.label}>Portions</Text>
            <TextInput
              style={styles.numberInput}
              value={formData.portions > 0 ? formData.portions.toString() : ""}
              onChangeText={(text) => updateField("portions", parseInt(text) || 0)}
              keyboardType="numeric"
              placeholder="2"
              placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
            placeholderTextColor="#999"
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F0",
    padding: 16,
  },
  imageSection: {
    height: 180,
    backgroundColor: "#E5E7DF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B8E7F",
    fontWeight: "500",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0C8",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#FAFAF8",
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D0D0C8",
    borderRadius: 12,
    backgroundColor: "#FAFAF8",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },

  row: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 16,
  },
  timeContainer: {
    flex: 2,
  },
  portionsContainer: {
    flex: 0.8,
  },
  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  numberInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#D0D0C8",
    borderRadius: 12,
    backgroundColor: "#FAFAF8",
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 12,
  },
  separator: {
    fontSize: 10,
    color: "#999",
    marginHorizontal: 4,
  },
  timePickerWrapper: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#D0D0C8",
    borderRadius: 12,
    backgroundColor: "#FAFAF8",
    overflow: "hidden",
    height: 50,
  },
  timePicker: {
    height: 50,
    width: "100%",
  },

  error: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  buttonWrapper: {
    flex: 1,
  },
});
