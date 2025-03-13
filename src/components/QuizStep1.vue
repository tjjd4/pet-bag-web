<script setup lang="ts">
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import RadioGroup from "./RadioGroup.vue";
import SelectGroup from "./SelectGroup.vue";
import { type IQuestion } from "../types/types.ts";

interface FormDataQ2 {
  petBreed: string | null;
  petMeals: string | null;
  petFoodType: string | null;
  petAllergies: string | null;
}

const form = reactive<FormDataQ2>({
  petBreed: null,
  petMeals: null,
  petFoodType: null,
  petAllergies: null
});

const rules: Record<keyof FormDataQ2, any> = {
  petBreed: { required },
  petMeals: { required },
  petFoodType: { required },
  petAllergies: { required }
};

const questions: IQuestion<FormDataQ2>[] = [
  {
    label: "寵物是什麼品種？",
    model: 'petBreed',
    type: 'select',
    options: [
      { text: "柴犬", value: "shiba_inu" },
      { text: "哈士奇", value: "siberian_husky" },
      { text: "拉布拉多", value: "labrador_retriever" },
      { text: "黃金獵犬", value: "golden_retriever" },
      { text: "柯基", value: "pembroke_welsh_corgi" },
      { text: "鬆獅犬", value: "chow_chow" },
      { text: "貴賓犬", value: "poodle" },
      { text: "法鬥", value: "french_bulldog" },
      { text: "秋田犬", value: "akita" },
      { text: "邊境牧羊犬", value: "border_collie" },
      { text: "英短", value: "british_shorthair" },
      { text: "美短", value: "american_shorthair" },
      { text: "布偶貓", value: "ragdoll" },
      { text: "緬因貓", value: "maine_coon" },
      { text: "加菲貓", value: "exotic_shorthair" },
      { text: "挪威森林貓", value: "norwegian_forest_cat" },
      { text: "孟加拉貓", value: "bengal" },
      { text: "蘇格蘭摺耳貓", value: "scottish_fold" },
      { text: "暹羅貓", value: "siamese" },
      { text: "俄羅斯藍貓", value: "russian_blue" }
    ]
  },
  {
    label: "寵物一天吃幾餐？",
    model: 'petMeals',
    type: 'radio',
    options: [
      { text: "1餐", value: "one_meal" },
      { text: "早晚2餐", value: "two_meals" },
      { text: "一天3餐", value: "three_meals" },
      { text: "吃到飽模式", value: "free_feeding" }
    ]
  },
  {
    label: "平時是吃什麼形式的正餐？",
    model: 'petFoodType',
    type: 'radio',
    options: [
      { text: "乾糧飼料", value: "dry_food" },
      { text: "罐頭", value: "canned_food" },
      { text: "鮮食(自己煮菜煮肉)", value: "home_cooked" },
      { text: "生食", value: "raw_food" }
    ]
  },
  {
    label: "寵物對什麼食物過敏，不喜歡吃？",
    model: 'petAllergies',
    type: 'radio',
    options: [
      { text: "容易過敏1", value: "allergen_1" },
      { text: "容易過敏2", value: "allergen_2" }
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
    <component
      :is="question.type === 'select' ? SelectGroup : RadioGroup"
      :label="question.label" 
      :options="question.options" 
      v-model="form[question.model as keyof FormDataQ2]" 
      class="my-5"
    />
    <p v-if="v$[question.model]?.$error" class="text-red-500">此欄位為必填。</p>
  </div>
  <button @click="submitForm" class="mt-5 bg-teal-600 text-white py-2 px-4 rounded">提交</button>
</template>
