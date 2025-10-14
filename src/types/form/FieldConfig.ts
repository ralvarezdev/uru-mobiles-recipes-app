import { RegisterOptions } from "react-hook-form";
import { TextInputProps } from "react-native";
import { FieldType } from "./FieldType";
import { SelectOption } from "./SelectOption";

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  rules?: RegisterOptions;
  options?: SelectOption[];
  textInputProps?: Omit<TextInputProps, "value" | "onChangeText">;
  numberOfLines?: number;
  readOnly?: boolean;
  hidden?: boolean;
}

