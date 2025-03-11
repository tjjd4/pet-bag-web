export interface IOption {
  text: string,
  value: string,
}

export interface IQuestion<T> {
  label: string;
  model: keyof T;
  options: IOption[];
  required?: boolean;
}