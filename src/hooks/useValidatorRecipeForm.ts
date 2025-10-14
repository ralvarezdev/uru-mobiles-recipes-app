// hooks/useValidatorRecipeForm.ts
import { CreateRecipeInput } from "@/services/recipe/types";
import { useState } from "react";

interface ValidationErrors {
  title?: string;
  description?: string;
  categoryId?: string;
  prepareTime?: string;
  portions?: string;
  ingredients?: string;
  steps?: string;
}

export const useValidatorRecipeForm = () => {
  const [formData, setFormData] = useState<CreateRecipeInput>({
    image: "",
    title: "",
    description: "",
    categoryId: 0,
    prepareTime: 0,
    unitPrepareTime: "minutes",
    portions: 0,
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateForm = (): boolean => {
    const validations = [
      {
        field: "title" as const,
        isInvalid: !formData.title.trim(),
        message: "Title is required",
      },
      {
        field: "description" as const,
        isInvalid: !formData.description?.trim(),
        message: "Description is required",
      },
      {
        field: "categoryId" as const,
        isInvalid: !formData.categoryId,
        message: "Please select a category",
      },
      {
        field: "prepareTime" as const,
        isInvalid: !formData.prepareTime || formData.prepareTime <= 0,
        message: "Prepare time must be greater than 0",
      },
      {
        field: "portions" as const,
        isInvalid: !formData.portions || formData.portions <= 0,
        message: "Portions must be greater than 0",
      },
      {
        field: "ingredients" as const,
        isInvalid: !formData.ingredients.trim(),
        message: "Ingredients are required",
      },
      {
        field: "steps" as const,
        isInvalid: !formData.steps.trim(),
        message: "Preparation steps are required",
      },
    ];

    const newErrors: ValidationErrors = {};

    validations.forEach(({ field, isInvalid, message }) => {
      if (isInvalid) {
        newErrors[field] = message;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updateField = <K extends keyof CreateRecipeInput>(field: K, value: CreateRecipeInput[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      categoryId: 0,
      prepareTime: 0,
      unitPrepareTime: "minutes",
      image: "",
      portions: 0,
      ingredients: "",
      steps: "",
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isValidating,
    validateForm,
    updateField,
    resetForm,
  };
};
