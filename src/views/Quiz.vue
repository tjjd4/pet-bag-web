<script setup lang="ts">
import QuizPhase1 from "../components/QuizPhase1.vue";
import QuizPhase2 from "../components/QuizPhase2.vue";
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-[#fff] p-6"
    >
        <div class="max-w-lg w-full bg-white p-6 rounded-2xl shadow-lg">
            <QuizPhase2 />
        </div>
    </div>
</template>
