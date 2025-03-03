<script setup lang="ts">
import RadioGroup from "./RadioGroup.vue";
import SelectGroup from "./SelectGroup.vue";
import { type IQuestions } from "../types/types.ts"

const questions: IQuestions[] = [
  { label: "寵物是什麼品種？", options: 
    [
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
  { label: "寵物一天吃幾餐？", options: [
    { text: "1餐", value: "one_meal" },
    { text: "早晚2餐", value: "two_meals" },
    { text: "一天3餐", value: "three_meals" },
    { text: "吃到飽模式", value: "free_feeding" }
  ]},
  { label: "平時是吃什麼形式的正餐？", options: [
    { text: "乾糧飼料", value: "dry_food" },
    { text: "罐頭", value: "canned_food" },
    { text: "鮮食(自己煮菜煮肉)", value: "home_cooked" },
    { text: "生食", value: "raw_food" }
  ]},
  { label: "寵物對什麼食物過敏，不喜歡吃？", options: [
    { text: "容易過敏1", value: "allergen_1" },
    { text: "容易過敏2", value: "allergen_2" }
  ]},
];

</script>

<template>
    <SelectGroup :label="questions[0].label" :options="questions[0].options" class="my-5" />
    <RadioGroup :label="questions[1].label" :options="questions[1].options" class="my-5" />
    <RadioGroup :label="questions[2].label" :options="questions[2].options" class="my-5" />
    <RadioGroup :label="questions[3].label" :options="questions[3].options" class="my-5" />
</template>