import { FieldConfig } from "./FieldConfig";

export interface FormConfig<T> {
  fields: FieldConfig<T>[];
  submitLabel?: string;
  cancelLabel?: string;
  showCancelButton?: boolean;
}

