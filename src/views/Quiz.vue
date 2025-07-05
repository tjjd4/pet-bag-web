<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import QuizPhase1 from "../components/QuizPhase1.vue";
import QuizPhase2 from "../components/QuizPhase2.vue";
import { type FormDataQ1, type FormDataQ2 } from "../types/types";

const router = useRouter();
const currentPhase = ref<1 | 2>(1);
const phase1Data = ref<FormDataQ1 | null>(null);
const phase2Data = ref<FormDataQ2 | null>(null);

const handlePhase1Complete = (data: FormDataQ1) => {
    phase1Data.value = data;
    currentPhase.value = 2;
};

const handlePhase2Complete = (data: FormDataQ2) => {
    phase2Data.value = data;
    
    if (phase1Data.value && phase2Data.value) {
        // Store data in sessionStorage to pass to result page
        sessionStorage.setItem('quizData', JSON.stringify({
            phase1: phase1Data.value,
            phase2: phase2Data.value
        }));
        
        // Navigate to result page using router
        router.push('/result');
    }
};

const goBackToPhase1 = () => {
    currentPhase.value = 1;
};
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-[#fff] p-6"
    >
        <QuizPhase1 
            v-if="currentPhase === 1" 
            :initial-data="phase1Data"
            @phase-complete="handlePhase1Complete"
        />
        <QuizPhase2 
            v-if="currentPhase === 2"
            :initial-data="phase2Data"
            @phase-complete="handlePhase2Complete"
            @go-back="goBackToPhase1"
        />
    </div>
</template>
