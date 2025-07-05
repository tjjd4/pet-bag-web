<script setup lang="ts">
import { reactive, watch, ref } from "vue";
import { type Q2SelectionType, type FormDataQ2 } from "../types/types";
import { phase2Questions } from "../data/questions";

const props = defineProps<{
    initialData?: FormDataQ2 | null;
}>();

const emits = defineEmits<{
    (e: "update-form", data: FormDataQ2): void;
}>();

// Section options and current state
const sectionOptions = [
  { label: "皮膚問題", value: "skin" as Q2SelectionType },
  { label: "關節問題", value: "joint" as Q2SelectionType },
  { label: "消化問題", value: "digestion" as Q2SelectionType },
];

const currentSection = ref<Q2SelectionType | null>("skin");

// Initialize form data
const formData = reactive<FormDataQ2>({
    skin1: props.initialData?.skin1 || null,
    skin2: props.initialData?.skin2 || null,
    skin3: props.initialData?.skin3 || null,
    skin4: props.initialData?.skin4 || null,
    skin5: props.initialData?.skin5 || null,
    joint1: props.initialData?.joint1 || null,
    joint2: props.initialData?.joint2 || null,
    joint3: props.initialData?.joint3 || null,
    joint4: props.initialData?.joint4 || null,
    joint5: props.initialData?.joint5 || null,
    digestion1: props.initialData?.digestion1 || null,
    digestion2: props.initialData?.digestion2 || null,
    digestion3: props.initialData?.digestion3 || null,
    digestion4: props.initialData?.digestion4 || null,
    digestion5: props.initialData?.digestion5 || null,
});



// Watch for changes in initialData prop
watch(() => props.initialData, (newData) => {
    if (newData) {
        Object.assign(formData, newData);
    }
}, { immediate: true });

// Watch form data and emit updates
watch(formData, (newFormData) => {
    emits("update-form", { ...newFormData });
}, { deep: true });

// Toggle section functionality
function selectSection(section: Q2SelectionType) {
    if (currentSection.value === section) {
        currentSection.value = null;
    } else {
        currentSection.value = section;
    }
}

// Helper function to get field name based on section and question id
const getFieldName = (section: Q2SelectionType, questionId: number): keyof FormDataQ2 => {
    return `${section}${questionId}` as keyof FormDataQ2;
};

// Handle answer changes
const handleAnswerChange = (section: Q2SelectionType, questionId: number, value: string) => {
    const fieldName = getFieldName(section, questionId);
    formData[fieldName] = value;
};

// Check if section has answers
const sectionHasAnswers = (section: Q2SelectionType): boolean => {
    const sectionKeys = Object.keys(formData).filter(key => key.startsWith(section)) as Array<keyof FormDataQ2>;
    return sectionKeys.some(key => formData[key] !== null);
};

// Check if section is complete (all required questions answered)
const sectionIsComplete = (section: Q2SelectionType): boolean => {
    const questions = phase2Questions[section];
    const requiredQuestions = questions.filter(q => q.required);
    
    return requiredQuestions.every(question => {
        const fieldName = getFieldName(section, question.id);
        return formData[fieldName] !== null;
    });
};
</script>

<template>
    <div>
        <!-- Section navigation -->
        <div class="flex flex-col gap-2 mb-8">
            <div v-for="section in sectionOptions" :key="section.value">
                <button
                    @click="selectSection(section.value)"
                    :class="[
                        'px-2 py-1 border-l-4 text-left w-full flex items-center justify-between',
                        currentSection === section.value
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent hover:border-purple-300'
                    ]"
                >
                    <span>{{ section.label }}</span>
                    <span 
                        v-if="sectionIsComplete(section.value)"
                        class="text-green-500 text-sm"
                    >
                        ✓
                    </span>
                    <span 
                        v-else-if="sectionHasAnswers(section.value)"
                        class="text-yellow-500 text-sm"
                    >
                        ⚠
                    </span>
                </button>
                
                <!-- Section questions -->
                <transition name="fade-slide">
                    <div
                        v-if="currentSection === section.value"
                        class="pl-4 mt-2 space-y-6"
                    >
                        <div
                            v-for="question in phase2Questions[section.value]"
                            :key="question.id"
                            class="mb-6"
                        >
                            <p class="mb-4 font-semibold text-base text-gray-800">
                                {{ question.id }}. {{ question.text }}
                                <span v-if="question.required" class="text-red-500 text-sm ml-1">*</span>
                            </p>
                            <div class="flex flex-col gap-3">
                                <label
                                    v-for="option in question.options"
                                    :key="option.value"
                                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="radio"
                                        :name="'q' + section.value + '_' + question.id"
                                        :value="option.value"
                                        :checked="formData[getFieldName(section.value, question.id)] === option.value"
                                        @change="handleAnswerChange(section.value, question.id, option.value)"
                                        class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                                    />
                                    <span class="text-gray-700">{{ option.text }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>
