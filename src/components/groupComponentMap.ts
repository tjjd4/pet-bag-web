import RadioGroup from './RadioGroup.vue';
import CheckboxGroup from './CheckboxGroup.vue';
import SelectGroup from './SelectGroup.vue';
import InputField from './InputField.vue';

export const groupComponentMap: Record<string, any> = {
    radio: RadioGroup,
    checkbox: CheckboxGroup,
    select: SelectGroup,
    text: InputField,
};