<script setup lang="ts">
import { ref } from "vue";
import QuizStep2 from "./QuizStep2.vue";
import { type FormDataPhase2 } from "../types/formData";
import { type FormDataPhase2Selection } from "../types/types";

const props = defineProps<{
    initialData?: FormDataPhase2 | null;
}>();

const emits = defineEmits<{
    (e: "go-back"): void;
    (e: "phase-complete", data: FormDataPhase2): void;
}>();

// Section options and current state
const sectionOptions = [
  { label: "皮膚問題", value: "skin" as FormDataPhase2Selection },
  { label: "關節問題", value: "joint" as FormDataPhase2Selection },
  { label: "消化問題", value: "digestion" as FormDataPhase2Selection },
];

const currentSection = ref<FormDataPhase2Selection | null>("skin");

// 切換 section 的方法 - 支持開關功能
function selectSection(section: FormDataPhase2Selection) {
  if (currentSection.value === section) {
    // 如果點擊的是當前已打開的section，則關閉它
    currentSection.value = null;
  } else {
    // 否則打開新的section
    currentSection.value = section;
  }
}

const goBackToPhase1 = () => {
    emits("go-back");
};

// Data management
const formDataPhase2 = ref<FormDataPhase2>({
    skin: props.initialData?.skin || {},
    joint: props.initialData?.joint || {},
    digestion: props.initialData?.digestion || {},
});

const handleSectionUpdate = (section: FormDataPhase2Selection) => (sectionData: Record<number, string>) => {
    formDataPhase2.value[section] = sectionData;
};


const proceedToResults = () => {
  emits("phase-complete", formDataPhase2.value);
};
</script>

<template>
    <div>
        <!-- Header with back button -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <button 
                    @click="goBackToPhase1"
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
        
        <!-- 側邊 section 導覽及問題 -->
        <div class="flex flex-col gap-2">
            <div v-for="section in sectionOptions" :key="section.value">
                <button
                    @click="selectSection(section.value)"
                    :class="[
                        'px-2 py-1 border-l-4 text-left w-full',
                        currentSection === section.value
                            ? 'border-purple-600 text-purple-600'
                            : 'border-transparent hover:border-purple-300'
                    ]"
                >
                    {{ section.label }}
                </button>
                <transition name="fade-slide">
                    <div
                        v-if="currentSection === section.value"
                        class="pl-4 mt-2"
                    >
                        <QuizStep2
                            :section="section.value"
                            :section-label="section.label"
                            :initial-data="formDataPhase2[section.value]"
                            @update-form="handleSectionUpdate(section.value)"
                        />
                    </div>
                </transition>
            </div>
        </div>
        
        <!-- Results button -->
        <div class="mt-8 text-center">
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
