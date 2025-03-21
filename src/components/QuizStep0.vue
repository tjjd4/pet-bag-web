<script setup lang="ts">
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import RadioGroup from "./RadioGroup.vue";
import { type IQuestion } from '../types/types';
import { type FormDataQ0 } from '../types/formData';

const props = defineProps<{
  nextStep: () => void;
}>();

const emits = defineEmits<{
  (e: 'updateForm', formData: FormDataQ0): void;
}>();

const form = reactive<FormDataQ0>({
  petType: null,
  petAge: null,
  petGender: null
});

const rules: Record<keyof FormDataQ0, any> = {
  petType: { required },
  petAge: { required },
  petGender: { required }
};

const questions: IQuestion<FormDataQ0>[] = [
  { 
    label: "您的愛寵是？",
    model: 'petType',
    type: 'radio',
    options: [
      { text: "貓咪", value: "cat" },
      { text: "狗狗", value: "dog" }
    ]
  },
  { 
    label: "寵物年齡是幾歲？",
    model: 'petAge',
    type: 'radio',
    options: [
      { text: "0-2 歲 (幼年)", value: "age_0_2" },
      { text: "3-5 歲 (成年)", value: "age_3_5" },
      { text: "5-10 歲 (中年)", value: "age_5_10" },
      { text: "10+ 歲 (老年)", value: "age_10_plus" }
    ]
  },
  {
    label: "寵物的生理性別？",
    model: 'petGender',
    type: 'radio',
    options: [
      { text: "男", value: "male" },
      { text: "女", value: "female" }
    ]
  }
];

const v$ = useVuelidate(rules, form);

const handleSubmit = () => {
  v$.value.$validate();
  if (!v$.value.$invalid) {
    console.log(`[QuizStep0] ${form}`);
    emits('updateForm', form);
    props.nextStep();
  } else {
    console.log(`[QuizStep0] Not all questiones are anwsered.\n ${form.petAge}, ${form.petGender}, ${form.petType}`);
    alert('請完成所有必填項目。');
  }
};
</script>

<template>
  <div v-for="question in questions" :key="question.label">
    <RadioGroup
      :label="question.label"
      :options="question.options"
      v-model:value="form[question.model as keyof FormDataQ0]"
      class="my-5"
    />
    <p v-if="v$[question.model]?.$error" class="text-red-500">此欄位為必填。</p>
  </div>
  <div class="flex flex-row-reverse justify-between mt-6">
    <button @click="handleSubmit" class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg">下一題</button>
  </div>
</template>