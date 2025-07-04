export type QuestionType = "radio" | "select" | "checkbox" | "text";

export interface IOption {
  text: string;
  value: string;
}

export interface IQuestion<T> {
  label: string;
  model: keyof T;
  options: IOption[];
  type: QuestionType;
  props?: any;
}

export type FormDataPhase2Selection = 'skin' | 'joint' | 'digestion';