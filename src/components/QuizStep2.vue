<script setup lang="ts">
import { reactive } from "vue";

import { type FormDataQ2 } from "../types/types";
import { phase2Questions } from "../data/questions";

const props = defineProps<{
    goBack?: () => void;
    initialData?: FormDataQ2 | null;
}>();

const emits = defineEmits<{
    (e: "update-form", formData: FormDataQ2): void;
}>();

const form = reactive<FormDataQ2>({
    healthSkin: props.initialData?.healthSkin || null,
    healthJoint: props.initialData?.healthJoint || null,
    healthDigestion: props.initialData?.healthDigestion || null,
    healthEyes: props.initialData?.healthEyes || null,
    healthOral: props.initialData?.healthOral || null,
});

const questions = phase2Questions;

// Map health issue values to form fields
const healthIssueToFormField: Record<string, keyof FormDataQ2> = {
    'skin': 'healthSkin',
    'joint': 'healthJoint',
    'digestion': 'healthDigestion',
    'eyes': 'healthEyes',
    'oral': 'healthOral'
};

// Handle health issue checkbox changes
const handleHealthIssueChange = (value: string, checked: boolean) => {
    const fieldName = healthIssueToFormField[value];
    form[fieldName] = checked;
};

const handleSubmit = () => {
    console.log(`[QuizStep2]`, form);
    emits("update-form", form);
};
</script>

<template>
    <div class="min-h-screen bg-white px-4 py-6 flex flex-col">
        <!-- 標題 -->
        <div class="text-center mb-8">
            <h1 class="text-xl font-bold text-gray-800 mb-2">健康問題主訴</h1>
            <p class="text-sm text-gray-600">請選擇您關心的健康問題（可複選）</p>
        </div>

        <div v-for="question in questions" :key="question.id" class="mb-8">
            <!-- Checkbox for health issues -->
            <div v-if="question.type === 'checkbox'" class="max-w-md mx-auto">
                <div class="space-y-3">
                    <label
                        v-for="option in question.options"
                        :key="option.value"
                        class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
                    >
                        <input
                            type="checkbox"
                            :value="option.value"
                            :checked="form[healthIssueToFormField[option.value]] === true"
                            @change="handleHealthIssueChange(option.value, ($event.target as HTMLInputElement).checked)"
                            class="w-4 h-4 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                        />
                        <div class="text-left">
                            <div class="text-gray-800 font-medium">{{ option.text }}</div>
                            <div v-if="option.description" class="text-xs text-gray-500">{{ option.description }}</div>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <!-- 按鈕區域 -->
        <div class="flex justify-between items-center">
            <button
                v-if="props.goBack"
                @click="props.goBack"
                class="px-6 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
            >
                返回
            </button>
            <div v-else></div>
            <button
                @click="handleSubmit"
                class="px-8 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
            >
                下一步
            </button>
        </div>
    </div>
</template>
