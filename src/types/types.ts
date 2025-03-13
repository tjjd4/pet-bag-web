export type QuestionType = "radio" | "select" | "default"

export interface IOption {
  text: string,
  value: string,
}

export interface IQuestion<T> {
  label: string;
  model: keyof T;
  options: IOption[];
  type: QuestionType;
  required?: boolean;
}