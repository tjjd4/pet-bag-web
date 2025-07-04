import RadioGroup from './shared/RadioGroup.vue';
import CheckboxGroup from './shared/CheckboxGroup.vue';
import SelectGroup from './shared/SelectGroup.vue';
import InputField from './shared/InputField.vue';

export const groupComponentMap: Record<string, any> = {
    radio: RadioGroup,
    checkbox: CheckboxGroup,
    select: SelectGroup,
    text: InputField,
};