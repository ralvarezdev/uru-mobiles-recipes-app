import { FormConfig } from '@/types/form';
import { CreateRecipeInput } from '@/services/recipe/types';

const MOCK_CATEGORIES = [
  { label: 'Desserts', value: 1 },
  { label: 'Pasta', value: 2 },
  { label: 'Meat', value: 3 },
  { label: 'Salads', value: 4 },
  { label: 'Soups', value: 5 },
];

export const recipeFormConfig: FormConfig<CreateRecipeInput> = {
  fields: [
    {
      name: 'image',
      label: 'Recipe Image',
      type: 'image',
      placeholder: 'Add picture',
      rules: {
        required: 'Image is required',
      },
    },
    {
      name: 'title',
      label: 'Recipe Title',
      type: 'text',
      placeholder: 'Enter title',
      rules: {
        required: 'Title is required',
        minLength: { value: 3, message: 'Minimum 3 characters' },
        maxLength: { value: 100, message: 'Maximum 100 characters' },
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter description',
      numberOfLines: 3,
      rules: {
        required: 'Description is required',
        minLength: { value: 10, message: 'Minimum 10 characters' },
      },
    },
    {
      name: 'categoryId',
      label: 'Category',
      type: 'select',
      placeholder: 'Select category...',
      options: MOCK_CATEGORIES,
      rules: {
        required: 'Please select a category',
        validate: (value) => value !== 0 || 'Please select a valid category',
      },
    },
    {
      name: 'prepareTime',
      label: 'Prepare Time (minutes)',
      type: 'number',
      placeholder: '60',
      rules: {
        required: 'Prepare time is required',
        min: { value: 1, message: 'Must be at least 1 minute' },
        max: { value: 1440, message: 'Must be less than 24 hours' },
      },
    },
    {
      name: 'portions',
      label: 'Portions',
      type: 'number',
      placeholder: '2',
      rules: {
        required: 'Portions is required',
        min: { value: 1, message: 'Must be at least 1 portion' },
        max: { value: 100, message: 'Must be less than 100 portions' },
      },
    },
    {
      name: 'ingredients',
      label: 'Ingredients',
      type: 'textarea',
      placeholder: 'Enter ingredients (one per line)',
      numberOfLines: 4,
      rules: {
        required: 'Ingredients are required',
        minLength: { value: 10, message: 'Minimum 10 characters' },
      },
    },
    {
      name: 'steps',
      label: 'Preparation Steps',
      type: 'textarea',
      placeholder: 'Enter preparation steps',
      numberOfLines: 6,
      rules: {
        required: 'Preparation steps are required',
        minLength: { value: 20, message: 'Minimum 20 characters' },
      },
    },
  ],
  submitLabel: 'Save Recipe',
  cancelLabel: 'Cancel',
  showCancelButton: true,
};