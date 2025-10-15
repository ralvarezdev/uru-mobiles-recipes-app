import { FormConfig } from "@/types/form";

export interface GroupFormData {
  title: string;
  description: string;
  image: string;
}

export const groupFormConfig: FormConfig<GroupFormData> = {
  fields: [
    {
      name: "image",
      label: "Group Image",
      type: "image",
      placeholder: "Add picture",
      rules: {
        required: "Image is required",
      },
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter group name",
      rules: {
        required: "Title is required",
        minLength: { value: 3, message: "Minimum 3 characters" },
        maxLength: { value: 50, message: "Maximum 50 characters" },
      },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter group description",
      numberOfLines: 4,
      rules: {
        required: "Description is required",
        minLength: { value: 10, message: "Minimum 10 characters" },
        maxLength: { value: 500, message: "Maximum 500 characters" },
      },
    },
  ],
  submitLabel: "Save",
  cancelLabel: "Cancel",
  showCancelButton: true,
};
