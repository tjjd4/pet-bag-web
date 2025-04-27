<script setup lang="ts">
import { ref, reactive } from "vue";
import { type IQuestion } from "../types/types";
import { type FormDataSelection } from "../types/formData";

// Placeholder quiz section definitions
const quizSections: IQuestion<FormDataSelection>[] = [
    {
        label: "您的愛寵是？",
        model: "petType",
        type: "checkbox",
        options: [
            { text: "貓咪", value: "cat" },
            { text: "狗狗", value: "dog" },
        ],
    },
    { label: "營養 (Nutrition)", model: "nutrition", type: "checkbox" },
    { label: "運動 (Exercise)", model: "exercise", type: "checkbox" },
    { label: "醫療史 (Medical History)", model: "medical", type: "checkbox" },
    { label: "生活環境 (Living Environment)", model: "environment", type: "checkbox" },
];

const form = reactive<FormDataSelection>({
    nutrition: null,
    exercise: null,
    medical: null,
    environment: null,
});

const phase = ref<"select" | "quiz" | "done">("select");
const selectedSections = ref<string[]>([]);
const currentSectionIdx = ref(0);

function startQuiz() {
  if (selectedSections.value.length > 0) {
    phase.value = "quiz";
    currentSectionIdx.value = 0;
  }
}

function nextSection() {
  if (currentSectionIdx.value < selectedSections.value.length - 1) {
    currentSectionIdx.value++;
  } else {
    // Quiz phase finished, handle accordingly (emit event, show summary, etc.)
    phase.value = "done";
  }
}
</script>

<template>
  <div>
    <div v-if="phase === 'select'">
      <h1 class="text-xl font-semibold text-center mb-4">第二階段：</h1>
      <h2 class="text-lg font-semibold text-center mb-4">健康狀況 & 需求或目標</h2>
      <div class="mb-6">
        <CheckboxGroup
            :label="quizSections.label"
            :options="quizSections.options"
            v-model:value="form[quizSections.model as keyof FormDataSelection]"
            class="my-5"
        />
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="bg-cyan-600 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-md hover:bg-cyan-700 transition duration-300"
          :disabled="selectedSections.length === 0"
          @click="startQuiz"
        >
          下一步
        </button>
      </div>
    </div>

    <div v-else-if="phase === 'quiz'">
      <h1 class="text-xl font-semibold text-center mb-4">
        {{ quizSections.find(s => s.value === selectedSections[currentSectionIdx])?.label }} 問卷
      </h1>
      <!-- Placeholder for quiz step component, replace with real component later -->
      <div class="mb-6 p-4 border rounded text-center bg-gray-50">
        <p class="text-lg text-gray-700">
          這裡將顯示 {{ quizSections.find(s => s.value === selectedSections[currentSectionIdx])?.label }} 的相關問題。
        </p>
      </div>
      <div class="flex justify-center mt-6">
        <button
          class="bg-cyan-600 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-md hover:bg-cyan-700 transition duration-300"
          @click="nextSection"
        >
          {{ currentSectionIdx < selectedSections.length - 1 ? '下一部分' : '完成' }}
        </button>
      </div>
    </div>

    <div v-else-if="phase === 'done'">
      <h1 class="text-xl font-semibold text-center mb-4">問卷已完成！</h1>
      <p class="text-center">感謝您的填寫。</p>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
