import { DynamicFormProps } from "@/types/form";
import React from "react";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { styles } from "./DynamicForm.style";
import DynamicField from "../DynamicField/DynamicField.component";
import CustomButtonCommon from "../../CustomButtonCommon/CustomButtonCommon.component";


export default function DynamicForm<T extends Record<string, any>>({
  config,
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: DynamicFormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onBlur",
  });

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      {config.fields
        .filter((field) => !field.hidden)
        .map((field) => (
          <DynamicField key={String(field.name)} field={field} control={control} errors={errors} />
        ))}

      <View style={styles.buttonContainer}>
        {(onCancel || config.showCancelButton) && (
          <View style={styles.buttonWrapper}>
            <CustomButtonCommon title={config.cancelLabel || "Cancel"} onPress={handleCancel} disabled={isLoading} />
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <CustomButtonCommon title={config.submitLabel || "Save"} onPress={handleSubmit(handleFormSubmit)} loading={isLoading} />
        </View>
      </View>
    </ScrollView>
  );
}
