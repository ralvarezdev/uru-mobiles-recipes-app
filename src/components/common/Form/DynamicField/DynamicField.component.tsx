import { FieldConfig, FieldType } from "@/types/form";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./DynamicField.style";

interface DynamicFieldProps<T> {
  field: FieldConfig<T>;
  control: Control<any>;
  errors: FieldErrors;
}

export default function DynamicField<T>({ field, control, errors }: DynamicFieldProps<T>) {
  const error = errors[field.name as string]?.message as string | undefined;

  const getKeyboardType = (type: FieldType) => {
    switch (type) {
      case "number":
        return "numeric";
      case "email":
        return "email-address";
      case "phone":
        return "phone-pad";
      case "url":
        return "url";
      default:
        return "default";
    }
  };

  const renderField = (onChange: any, onBlur: any, value: any): React.ReactElement | null => {
    if (field.hidden) return null;

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "phone":
      case "url":
        return (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={field.placeholder}
            placeholderTextColor="#999"
            keyboardType={getKeyboardType(field.type)}
            secureTextEntry={field.type === "password"}
            editable={!field.readOnly}
            autoCapitalize={field.type === "email" || field.type === "url" ? "none" : "sentences"}
            {...field.textInputProps}
          />
        );

      case "number":
        return (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={value > 0 ? value.toString() : ""}
            onChangeText={(text) => onChange(parseInt(text) || 0)}
            onBlur={onBlur}
            placeholder={field.placeholder}
            placeholderTextColor="#999"
            keyboardType="numeric"
            editable={!field.readOnly}
            {...field.textInputProps}
          />
        );

      case "textarea":
        return (
          <TextInput
            style={[styles.input, styles.textArea, error && styles.inputError]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={field.placeholder}
            placeholderTextColor="#999"
            multiline
            numberOfLines={field.numberOfLines || 4}
            textAlignVertical="top"
            editable={!field.readOnly}
            {...field.textInputProps}
          />
        );

      case "select":
        return (
          <View style={[styles.pickerContainer, error && styles.inputError]}>
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker} enabled={!field.readOnly}>
              <Picker.Item label={field.placeholder || "Select..."} value="" />
              {field.options?.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        );

      // case "date":
      // case "datetime":
      // case "time":
      //   return (
      //     <Pressable
      //       style={[styles.input, styles.dateInput, error && styles.inputError]}
      //       onPress={() => {
      //         if (!field.readOnly) {
      //           // TODO: Implementar date picker nativo
      //         }
      //       }}
      //       disabled={field.readOnly}>
      //       <Text style={value ? styles.dateText : styles.datePlaceholder}>{value || field.placeholder || "Select date"}</Text>
      //       <Ionicons name="calendar-outline" size={20} color="#999" />
      //     </Pressable>
      //   );

      case "image":
        return (
          <Pressable
            style={[styles.imageSection, error && styles.imageSectionError]}
            onPress={() => {
              if (!field.readOnly) {
                onChange("image-url-mock");
              }
            }}
            disabled={field.readOnly}>
            {value ? (
              <>
                <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
                <Text style={styles.imageTextSuccess}>Image selected</Text>
              </>
            ) : (
              <>
                <Ionicons name="camera-outline" size={64} color="#6B8E7F" />
                <Text style={styles.imageText}>{field.placeholder || "Add picture"}</Text>
              </>
            )}
          </Pressable>
        );

      case "row":
        return null; 

      default:
        return <Text>Unsupported field type: {field.type}</Text>;
    }
  };

  const renderSubField = (subField: FieldConfig<any>, onChange: any, onBlur: any, value: any, subError?: string): React.ReactElement  => {
    switch (subField.type) {
      case "number":
        return (
          <TextInput
            style={[styles.input, styles.rowInput, subError && styles.inputError]}
            value={value > 0 ? value.toString() : ""}
            onChangeText={(text) => onChange(parseInt(text) || 0)}
            onBlur={onBlur}
            placeholder={subField.placeholder}
            placeholderTextColor="#999"
            keyboardType="numeric"
            editable={!subField.readOnly}
          />
        );
      
      case "select":
        return (
          <View style={[styles.pickerContainer, styles.rowPicker, subError && styles.inputError]}>
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker} enabled={!subField.readOnly}>
              <Picker.Item label={subField.placeholder || "Select..."} value="" />
              {subField.options?.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        );
      
      default:
        return <Text>Unsupported subfield type: {subField.type}</Text>;
    }
  };

  if (field.hidden) return null;

  if (field.type === "row" && field.fields) {
    return (
      <View style={styles.field}>
        {field.label && <Text style={styles.label}>{field.label}</Text>}
        <View style={styles.row}>
          {field.fields.map((subField) => {
            const subError = errors[subField.name as string]?.message as string | undefined;
            return (
              <View key={String(subField.name)} style={[styles.rowItem, { flex: subField.flex || 1 }]}>
                {subField.label && <Text style={styles.labelSmall}>{subField.label}</Text>}
                <Controller
                  control={control}
                  name={subField.name as string}
                  rules={subField.rules}
                  render={({ field: { onChange, onBlur, value } }) => 
                    renderSubField(subField, onChange, onBlur, value, subError)
                  }
                />
                {subError && <Text style={styles.errorSmall}>{subError}</Text>}
              </View>
            );
          })}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{field.label}</Text>
      <Controller
        control={control}
        name={field.name as string}
        rules={field.rules}
        render={({ field: { onChange, onBlur, value } }) => renderField(onChange, onBlur, value) as React.ReactElement}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}