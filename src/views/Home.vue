<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToQuiz = () => {
  router.push('/quiz');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-6">Welcome to Dogeeeeeeeeeeeeeeeeeeeeee!</h1>
    <button @click="navigateToQuiz" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      開始測驗
    </button>
  </div>
</template>