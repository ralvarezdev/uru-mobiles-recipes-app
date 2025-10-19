import { UpdateRecipeInput } from '@/services';
import { FormConfig } from '@/types/form';

const MOCK_CATEGORIES = [
  { label: 'Desserts', value: 1 },
  { label: 'Pasta', value: 2 },
  { label: 'Meat', value: 3 },
  { label: 'Salads', value: 4 },
  { label: 'Soups', value: 5 },
];

const TIME_UNITS = [
  { label: 'min', value: 'minutes' },
  { label: 'hours', value: 'hours' },
  { label: 'sec', value: 'seconds' },
];

export const recipeFormConfig: FormConfig<UpdateRecipeInput> = {
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
      name: 'timeAndPortions' as any, 
      label: '',
      type: 'row',
      fields: [  
        {
          name: 'prepareTime',
          label: 'Prepare time',
          type: 'number',
          placeholder: '60',
          flex: 1,
          rules: {
            required: 'Required',
            min: { value: 1, message: 'Min 1' },
          },
        },
        {
          name: 'unitPrepareTime',
          label: 'Unit',
          type: 'select',
          placeholder: 'min',
          options: TIME_UNITS,
          flex: 1,
          rules: {
            required: 'Required',
          },
        },
        {
          name: 'portions',
          label: 'Portions',
          type: 'number',
          placeholder: '2',
          flex: 1,
          rules: {
            required: 'Required',
            min: { value: 1, message: 'Min 1' },
          },
        },
      ],
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