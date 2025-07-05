<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { type FormDataQ1 } from "../types/types";
import { phase1Questions } from "../data/questions";

const props = defineProps<{
    nextStep: () => void;
    initialData?: FormDataQ1 | null;
}>();

const emits = defineEmits<{
    (e: "updateForm", formData: FormDataQ1): void;
}>();

const form = reactive<FormDataQ1>({
    petType: props.initialData?.petType || null,
    petName: props.initialData?.petName || null,
    petAge: props.initialData?.petAge || null,
    petGender: props.initialData?.petGender || null,
    petBreed: props.initialData?.petBreed || null,
    petWeight: props.initialData?.petWeight || null,
    petBodyType: props.initialData?.petBodyType || null,
});

const rules: Record<keyof FormDataQ1, any> = {
    petType: { required },
    petName: { required },
    petAge: { required },
    petGender: { required },
    petBreed: { required },
    petWeight: { required },
    petBodyType: { required },
};

const questions = phase1Questions;

// Map question IDs to form field names
const questionToFormField: Record<number, keyof FormDataQ1> = {
    1: 'petType',
    2: 'petName',
    3: 'petAge',
    4: 'petGender',
    5: 'petBreed',
    6: 'petWeight',
    7: 'petBodyType',
};

const v$ = useVuelidate(rules, form);

// Handle answer changes
const handleAnswerChange = (questionId: number, value: string) => {
    const fieldName = questionToFormField[questionId];
    form[fieldName] = value;
};

const handleSubmit = () => {
    v$.value.$validate();
    if (!v$.value.$invalid) {
        console.log(`[QuizStep1]`, form);
        emits("updateForm", form);
        props.nextStep();
    } else {
        console.log(
            `[QuizStep1] Not all questions are answered.`,
            form
        );
        alert("請完成所有必填項目。");
    }
};
</script>

<template>
    <div class="min-h-screen bg-white px-4 py-6 flex flex-col">
        <h1 class="text-xl font-semibold text-gray-800 mb-6 text-left">寵物基本資料卡</h1>
        
        <div v-for="question in questions" :key="question.id" class="mb-8">
            <div class="text-center">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">
                    {{ question.text }}
                    <span v-if="question.required" class="text-red-500 text-sm ml-1">*</span>
                </h2>
                
                <!-- Radio buttons -->
                <div v-if="question.type === 'radio'" class="flex flex-wrap justify-center gap-3 max-w-xs mx-auto">
                    <label
                        v-for="option in question.options"
                        :key="option.value"
                        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
                    >
                        <input
                            type="radio"
                            :name="'q' + question.id"
                            :value="option.value"
                            :checked="form[questionToFormField[question.id]] === option.value"
                            @change="handleAnswerChange(question.id, option.value)"
                            class="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span class="text-gray-700 font-medium">{{ option.text }}</span>
                    </label>
                </div>
                
                <!-- Select dropdown -->
                <div v-else-if="question.type === 'select'" class="max-w-xs mx-auto">
                    <select
                        :value="form[questionToFormField[question.id]] || ''"
                        @change="handleAnswerChange(question.id, ($event.target as HTMLSelectElement).value)"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700"
                    >
                        <option value="">請選擇...</option>
                        <option
                            v-for="option in question.options"
                            :key="option.value"
                            :value="option.value"
                        >
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                
                <!-- Text input -->
                <div v-else-if="question.type === 'text'" class="max-w-xs mx-auto">
                    <input
                        type="text"
                        :value="form[questionToFormField[question.id]] || ''"
                        @input="handleAnswerChange(question.id, ($event.target as HTMLInputElement).value)"
                        :placeholder="question.placeholder"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                    />
                </div>
                
                <!-- Validation error -->
                <p v-if="question.required && v$[questionToFormField[question.id]]?.$error" class="text-red-500 text-sm mt-2">
                    此欄位為必填。
                </p>
            </div>
        </div>
        
        <div class="flex flex-row-reverse justify-between mt-6">
            <button
                @click="handleSubmit"
                class="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
                下一題
            </button>
        </div>
    </div>
</template>
