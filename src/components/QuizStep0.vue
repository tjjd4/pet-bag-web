<script setup lang="ts">
import RadioGroup from "./RadioGroup.vue";

const questions = [
  { label: "您的愛寵是？", options: [
    { text: "貓咪", value: "cat" },
    { text: "狗狗", value: "dog" }
  ]},
  { label: "寵物年齡是幾歲？", options: [
    { text: "0-2 歲 (幼年)", value: "age_0_2" },
    { text: "3-5 歲 (成年)", value: "age_3_5" },
    { text: "5-10 歲 (中年)", value: "age_5_10" },
    { text: "10+ 歲 (老年)", value: "age_10_plus" }
  ]},
  { label: "寵物的生理性別？", options: [
    { text: "男", value: "male" },
    { text: "女", value: "female" }
  ]}
];

</script>

<template>
    <RadioGroup :label="questions[0].label" :options="questions[0].options" class="my-5" />
    <RadioGroup :label="questions[1].label" :options="questions[1].options" class="my-5" />
    <RadioGroup :label="questions[2].label" :options="questions[2].options" class="my-5" />
</template>