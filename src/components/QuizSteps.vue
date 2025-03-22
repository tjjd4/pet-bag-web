<script setup lang="ts">
import { ref } from "vue";
import QuizStep0 from "./QuizStep0.vue";
import QuizStep1 from "./QuizStep1.vue";
import { type FormDataQ0, type FormDataQ1 } from "../types/formData";

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

const formDataStep0 = ref<FormDataQ0 | null>(null);

const handleFormDataQ0Update = (data: FormDataQ0) => {
    formDataStep0.value = data;
};
const formDataStep1 = ref<FormDataQ1 | null>(null);

const handleFormDataQ1Update = (data: FormDataQ1) => {
    formDataStep1.value = data;
};
</script>

<template>
    <div>
        <div v-if="currentStep === 0">
            <h1 class="text-xl font-semibold text-center mb-4">基本資訊</h1>
            <QuizStep0
                :nextStep="nextStep"
                @updateForm="handleFormDataQ0Update"
            />
        </div>
        <div v-if="currentStep === 1">
            <h1 class="text-xl font-semibold text-center mb-4">飲食資訊</h1>
            <QuizStep1
                :nextStep="nextStep"
                :prevStep="prevStep"
                @updateForm="handleFormDataQ1Update"
            />
        </div>
        <div v-if="currentStep === 2">
            <div>Finish!!!</div>
            <div>{{ formDataStep0 }}</div>
            <div>{{ formDataStep1 }}</div>
        </div>
    </div>
</template>
