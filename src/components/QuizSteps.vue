<script setup lang="ts">
import { ref } from "vue"
import QuizStep0 from "./QuizStep0.vue"
import QuizStep1 from "./QuizStep1.vue"

const currentStep = ref(0);
const totalSteps = 3;

const nextStep = () => {
  if (currentStep.value < totalSteps - 1) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>

<template>
  <div>
    <div v-if="currentStep === 0">
      <h1 class="text-xl font-semibold text-center mb-4">基本資訊</h1>
      <QuizStep0 />
    </div>
    <div v-if="currentStep === 1">
      <h1 class="text-xl font-semibold text-center mb-4">飲食資訊</h1>
      <QuizStep1 />
    </div>
    <div v-if="currentStep === 2">
      
    </div>
  </div>
  <div class="flex flex-row-reverse justify-between mt-6">
    <button @click="nextStep" class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg">下一題</button>
    <button v-if="currentStep > 0" @click="prevStep" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">上一步</button>
  </div>
</template>