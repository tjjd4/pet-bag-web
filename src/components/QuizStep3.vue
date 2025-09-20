<script setup lang="ts">
import { reactive, watch, computed, ref } from "vue";
import { type Q2SelectionType, type FormDataQ3 } from "../types/types";
import { phase3Questions } from "../data/questions";

const props = defineProps<{
    initialData?: FormDataQ3 | null;
}>();

const emits = defineEmits<{
    (e: "update-form", data: FormDataQ3): void;
    (e: "go-back"): void;
    (e: "phase-complete", data: FormDataQ3): void;
}>();

// 當前頁面狀態
const currentPage = ref(0);

// 問題組定義
const questionSections: { key: Q2SelectionType; title: string; }[] = [
    { key: 'skin', title: '皮膚狀況' },
    { key: 'joint', title: '關節狀況' },
    { key: 'digestion', title: '消化狀況' }
];

// Initialize form data
const formData = reactive<FormDataQ3>({
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

const currentQuestions = computed(() => {
    const section = questionSections[currentPage.value];
    return phase3Questions[section.key];
});

const currentTitle = computed(() => {
    return questionSections[currentPage.value].title;
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

// Helper function to get field name based on section and question id
const getFieldName = (section: string, questionId: number): keyof FormDataQ3 => {
    return `${section}${questionId}` as keyof FormDataQ3;
};

// Handle answer changes
const handleAnswerChange = (section: string, questionId: number, value: string) => {
    const fieldName = getFieldName(section, questionId);
    formData[fieldName] = value;
};

// 檢查當前頁面是否完成
const isCurrentPageComplete = computed(() => {
    const section = questionSections[currentPage.value];
    const questions = phase3Questions[section.key];
    
    return questions.every(question => {
        if (!question.required) return true;
        const fieldName = getFieldName(section.key, question.id);
        return formData[fieldName] !== null;
    });
});

// 導航函數
const goToPreviousPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--;
    } else {
        emits("go-back");
    }
};

const goToNextPage = () => {
    if (currentPage.value < questionSections.length - 1) {
        currentPage.value++;
    } else {
        // 最後一頁，完成整個phase
        emits("phase-complete", formData);
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <!-- 進度指示器 -->
            <div class="mb-8">
                <div class="flex items-center justify-between mb-4">
                    <h1 class="text-2xl font-bold text-gray-800">{{ currentTitle }}</h1>
                    <div class="text-sm text-gray-500">
                        {{ currentPage + 1 }} / {{ questionSections.length }}
                    </div>
                </div>
                
                <!-- 進度條 -->
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${((currentPage + 1) / questionSections.length) * 100}%` }"
                    ></div>
                </div>
            </div>

            <!-- 問題列表 -->
            <div class="space-y-8 min-h-96">
                <div v-for="question in currentQuestions" :key="question.id" class="mb-8">
                    <h3 class="text-lg font-medium text-gray-800 mb-4">
                        {{ question.id }}. {{ question.text }}
                        <span v-if="question.required" class="text-red-500 text-sm ml-1">*</span>
                    </h3>
                    
                    <!-- 根據問題類型選擇不同的佈局 -->
                    <div v-if="question.id === 1 && questionSections[currentPage].key === 'skin'" class="flex flex-wrap gap-4">
                        <!-- 皮膚問題1: 簡單的選項 -->
                        <button
                            v-for="option in question.options"
                            :key="option.value"
                            @click="handleAnswerChange(questionSections[currentPage].key, question.id, option.value)"
                            :class="[
                                'px-6 py-3 border-2 rounded-lg font-medium transition-all duration-200',
                                formData[getFieldName(questionSections[currentPage].key, question.id)] === option.value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                            ]"
                        >
                            {{ option.text }}
                        </button>
                        <div v-if="questionSections[currentPage].key === 'skin'" class="text-sm text-gray-500 w-full mt-2">1-4週</div>
                    </div>

                    <div v-else-if="question.id === 2 && questionSections[currentPage].key === 'skin'" class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <!-- 皮膚問題2: 身體部位選擇，3x2網格 -->
                        <button
                            v-for="option in question.options"
                            :key="option.value"
                            @click="handleAnswerChange(questionSections[currentPage].key, question.id, option.value)"
                            :class="[
                                'p-4 text-center border-2 rounded-lg font-medium transition-all duration-200',
                                formData[getFieldName(questionSections[currentPage].key, question.id)] === option.value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                            ]"
                        >
                            {{ option.text }}
                        </button>
                    </div>

                    <div v-else-if="question.id === 3 && questionSections[currentPage].key === 'skin'" class="flex flex-wrap gap-3">
                        <!-- 皮膚問題3: 症狀選擇，水平排列 -->
                        <button
                            v-for="option in question.options"
                            :key="option.value"
                            @click="handleAnswerChange(questionSections[currentPage].key, question.id, option.value)"
                            :class="[
                                'px-4 py-3 border-2 rounded-lg font-medium transition-all duration-200',
                                formData[getFieldName(questionSections[currentPage].key, question.id)] === option.value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                            ]"
                        >
                            {{ option.text }}
                        </button>
                    </div>

                    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <!-- 其他問題: 標準2列網格 -->
                        <button
                            v-for="option in question.options"
                            :key="option.value"
                            @click="handleAnswerChange(questionSections[currentPage].key, question.id, option.value)"
                            :class="[
                                'p-3 text-left border-2 rounded-lg font-medium transition-all duration-200',
                                formData[getFieldName(questionSections[currentPage].key, question.id)] === option.value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                            ]"
                        >
                            {{ option.text }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 底部導航按鈕 -->
            <div class="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
                <button
                    @click="goToPreviousPage"
                    class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    {{ currentPage === 0 ? '返回' : '上一頁' }}
                </button>
                
                <button
                    @click="goToNextPage"
                    :disabled="!isCurrentPageComplete"
                    :class="[
                        'px-8 py-2 rounded-lg font-medium transition-colors',
                        isCurrentPageComplete
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                >
                    {{ currentPage === questionSections.length - 1 ? '完成' : '下一步' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 自定義樣式 */
button:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
}
</style>
