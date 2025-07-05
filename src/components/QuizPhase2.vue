<script setup lang="ts">
import { ref, computed } from "vue";
import QuizStep2 from "./QuizStep2.vue";
import { type FormDataQ2 } from "../types/types";

const props = defineProps<{
    initialData?: FormDataQ2 | null;
}>();

const emits = defineEmits<{
    (e: "go-back"): void;
    (e: "phase-complete", data: FormDataQ2): void;
}>();

// Data management
const formDataQ2 = ref<FormDataQ2 | null>(props.initialData || null);

// Handle form updates from QuizStep2
const handleFormUpdate = (updatedData: FormDataQ2) => {
    formDataQ2.value = updatedData;
};

// Check if all sections have valid answers
const hasValidAnswersInAllSections = computed(() => {
    const skinAnswers = [formDataQ2.value?.skin1, formDataQ2.value?.skin2, formDataQ2.value?.skin3, formDataQ2.value?.skin4, formDataQ2.value?.skin5];
    const jointAnswers = [formDataQ2.value?.joint1, formDataQ2.value?.joint2, formDataQ2.value?.joint3, formDataQ2.value?.joint4, formDataQ2.value?.joint5];
    const digestionAnswers = [formDataQ2.value?.digestion1, formDataQ2.value?.digestion2, formDataQ2.value?.digestion3, formDataQ2.value?.digestion4, formDataQ2.value?.digestion5];

    const hasSkinAnswers = skinAnswers.every(answer => answer !== null);
    const hasJointAnswers = jointAnswers.every(answer => answer !== null);
    const hasDigestionAnswers = digestionAnswers.every(answer => answer !== null);

    return hasSkinAnswers && hasJointAnswers && hasDigestionAnswers;
});

const proceedToResults = () => {
    if (formDataQ2.value) {
        emits("phase-complete", formDataQ2.value);
    }
};
</script>

<template>
    <div>
        <!-- Header with back button -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <button 
                    @click="emits('go-back')"
                    class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    返回 Phase 1
                </button>
                <h1 class="text-2xl font-bold text-purple-600">Phase 2: 健康狀況評估</h1>
                <div></div> <!-- Spacer for flex layout -->
            </div>
        </div>
        
        <!-- Quiz questions handled by QuizStep2 -->
        <QuizStep2 
            :initial-data="formDataQ2"
            @update-form="handleFormUpdate"
        />
        
        <!-- Results button -->
        <div v-if="hasValidAnswersInAllSections" class="mt-8 text-center">
            <div class="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 class="text-lg font-semibold text-green-800 mb-2">
                    🎉 評估完成！
                </h3>
                <p class="text-green-600 mb-4">
                    您已完成相關健康狀況評估，點擊下方按鈕查看結果
                </p>
                <button 
                    @click="proceedToResults"
                    class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                    查看評估結果
                </button>
            </div>
        </div>
    </div>
</template>