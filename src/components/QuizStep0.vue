<script setup lang="ts">
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import RadioGroup from "./RadioGroup.vue";
import { type IQuestion } from '../types/types';

interface FormDataQ1 {
  petType: string | null;
  petAge: string | null;
  petGender: string | null;
}

const form = reactive<FormDataQ1>({
  petType: null,
  petAge: null,
  petGender: null
});

const rules: Record<keyof FormDataQ1, any> = {
  petType: { required },
  petAge: { required },
  petGender: { required }
};

const questions: IQuestion<FormDataQ1>[] = [
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

const submitForm = () => {
  v$.value.$validate();
  if (!v$.value.$invalid) {
    alert('表單提交成功!');
    console.log(form);
  } else {
    alert('請完成所有必填項目。');
  }
};
</script>

<template>
  <div v-for="question in questions" :key="question.label">
    <RadioGroup :label="question.label" :options="question.options" v-model="form[question.model as keyof FormDataQ1]" class="my-5" />
    <p v-if="v$[question.model]?.$error" class="text-red-500">此欄位為必填。</p>
  </div>
  <button @click="submitForm" class="mt-5 bg-teal-600 text-white py-2 px-4 rounded">提交</button>
</template>