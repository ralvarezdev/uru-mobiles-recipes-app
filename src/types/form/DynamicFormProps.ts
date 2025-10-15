import { FormConfig } from "./FormConfig";

export interface DynamicFormProps<T extends Record<string, any>> {
  config: FormConfig<T>;
  defaultValues: T;
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}