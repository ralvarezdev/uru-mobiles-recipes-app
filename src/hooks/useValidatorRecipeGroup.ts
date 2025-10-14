import { useState } from "react";

interface GroupFormData {
  title: string;
  description: string;
  image: string;
}
interface ValidationErrors {
  title?: string;
  description?: string;
  image?: string;
}

export const useValidatorGroupForm = () => {
  const [formData, setFormData] = useState<GroupFormData>({
    title: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

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
        field: "image" as const,
        isInvalid: !formData.image?.trim(),
        message: "Image is required",
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

  const updateField = <K extends keyof GroupFormData>(field: K, value: GroupFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    validateForm,
    updateField,
    resetForm,
  };
};
