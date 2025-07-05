<script setup lang="ts">
import { ref } from "vue";
import QuizStep1 from "./QuizStep1.vue";
import { type FormDataQ1 } from "../types/types";

const props = defineProps<{
    initialData?: FormDataQ1 | null;
}>();

const emits = defineEmits<{
    (e: "phase-complete", data: FormDataQ1): void;
}>();

const currentStep = ref(1);
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

const proceedToPhase2 = () => {
    if (formDataQ1.value) {
        emits("phase-complete", formDataQ1.value);
    }
};

const formDataQ1 = ref<FormDataQ1 | null>(props.initialData || null);

const handleFormDataQ1Update = (data: FormDataQ1) => {
    formDataQ1.value = data;
};
</script>

<template>
    <div>
        <div v-if="currentStep === 1">
            <QuizStep1
                :nextStep="nextStep"
                :initial-data="formDataQ1"
                @updateForm="handleFormDataQ1Update"
            />
        </div>
        <div v-if="currentStep === 2">
            <div class="text-center">
                <h2 class="text-2xl font-bold text-green-600 mb-4">Phase 1 完成！</h2>
                <p class="text-gray-600 mb-6">您已完成基本資料填寫</p>
                <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 class="font-semibold mb-2">您的填寫資料：</h3>
                    <pre class="text-sm">{{ formDataQ1 }}</pre>
                </div>
                <div class="flex gap-4 justify-center">
                    <button 
                        @click="prevStep"
                        class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        返回修改
                    </button>
                    <button 
                        @click="proceedToPhase2"
                        class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        前往 Phase 2
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
