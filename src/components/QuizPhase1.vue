<script setup lang="ts">
import { ref } from "vue";
import QuizStep1 from "./QuizStep1.vue";
import QuizStep2 from "./QuizStep2.vue";
import QuizStep3 from "./QuizStep3.vue";
import { type FormDataQ1, type FormDataQ2, type FormDataQ3 } from "../types/formData";

const currentStep = ref(0);
const totalSteps = 5;

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

const formDataStep1 = ref<FormDataQ1 | null>(null);

const handleFormDataQ1Update = (data: FormDataQ1) => {
    formDataStep1.value = data;
};
const formDataStep2 = ref<FormDataQ2 | null>(null);

const handleFormDataQ2Update = (data: FormDataQ2) => {
    formDataStep2.value = data;
};
const formDataStep3 = ref<FormDataQ3 | null>(null);

const handleFormDataQ3Update = (data: FormDataQ3) => {
    formDataStep3.value = data;
};
</script>

<template>
    <div>
        <div v-if="currentStep === 0">
            <h1 class="text-xl font-semibold text-center mb-4">第一階段：</h1>
            <h2 class="text-lg font-semibold text-center mb-4">基本資訊 & 生活習慣</h2>
            <div class="flex justify-center mt-6">
                <button
                    class="bg-gray-400 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-md hover:bg-gray-500 transition duration-300"
                    @click="nextStep"
                >
                    開始!
                </button>
            </div>
        </div>
        <div v-if="currentStep === 1">
            <h1 class="text-xl font-semibold text-center mb-4">基本資訊</h1>
            <QuizStep1
                :nextStep="nextStep"
                @updateForm="handleFormDataQ1Update"
            />
        </div>
        <div v-if="currentStep === 2">
            <h1 class="text-xl font-semibold text-center mb-4">生活習慣</h1>
            <QuizStep2
                :prevStep="prevStep"
                :nextStep="nextStep"
                @updateForm="handleFormDataQ2Update"
            />
        </div>
        <div v-if="currentStep === 3">
            <h1 class="text-xl font-semibold text-center mb-4">生活習慣</h1>
            <QuizStep3
                :nextStep="nextStep"
                :prevStep="prevStep"
                @updateForm="handleFormDataQ3Update"
            />
        </div>
        <div v-if="currentStep === 4">
            <div>Finish!!!</div>
            <div>{{ formDataStep1 }}</div>
            <div>{{ formDataStep2 }}</div>
            <div>{{ formDataStep3 }}</div>
        </div>
    </div>
</template>
