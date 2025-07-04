<script setup lang="ts">
import { reactive, watch } from "vue";
import { type FormDataPhase2Selection } from "../types/types";

const props = defineProps<{
    section: FormDataPhase2Selection;
    sectionLabel: string;
    initialData?: Record<number, string> | null;
}>();

const emits = defineEmits<{
    (e: "update-form", data: Record<number, string>): void;
}>();

// 問題資料
const questions: Record<FormDataPhase2Selection, { id: number; text: string; options: string[] }[]> = {
  skin: [
    {
      id: 1,
      text: "毛髮狀況",
      options: ["亮澤柔順", "局部掉毛", "大量掉毛 / 打結 / 黏塊"],
    },
    {
      id: 2,
      text: "是否搔癢或舔咬身體？",
      options: ["無", "偶爾", "頻繁"],
    },
    {
      id: 3,
      text: "有無異常氣味或皮屑？",
      options: ["無", "明顯異味", "可見皮屑 / 結痂"],
    },
    {
      id: 4,
      text: "掉毛或搔癢集中在哪個部位？",
      options: ["背部", "腹部", "四肢", "全身", "不確定"],
    },
    {
      id: 5,
      text: "是否曾更換洗毛精、床墊、環境等？",
      options: ["否", "是（請描述）"],
    },
  ],
  joint: [
    {
      id: 1,
      text: "走路時是否有異常？",
      options: ["無異常", "步態僵硬 / 偏斜", "跛行 / 拖腳"],
    },
    {
      id: 2,
      text: "是否抗拒跳高、上下樓？",
      options: ["無", "偶爾不願意", "完全抗拒"],
    },
    {
      id: 3,
      text: "是否聽見關節「喀喀聲」？",
      options: ["無", "偶爾", "經常"],
    },
    {
      id: 4,
      text: "出現問題的時段？",
      options: ["沒特別時段", "運動後", "起床時"],
    },
    {
      id: 5,
      text: "有無過往診斷過關節退化 / 骨骼問題？",
      options: ["無", "有（請填寫）"],
    },
  ],
  digestion: [
    {
      id: 1,
      text: "食慾情況",
      options: ["吃得正常", "吃得比以前少", "拒食 / 進食困難"],
    },
    {
      id: 2,
      text: "嘔吐狀況",
      options: ["無", "偶爾（1~2次/週）", "頻繁（3次以上/週）"],
    },
    {
      id: 3,
      text: "排便狀況",
      options: ["成形正常", "軟便 / 水便", "便秘 / 排便費力"],
    },
    {
      id: 4,
      text: "是否有吃異物或人類食物？",
      options: ["無", "有（請填寫物品）"],
    },
    {
      id: 5,
      text: "最近是否更換食物或營養補充？",
      options: ["無", "有（請描述品牌 / 種類）"],
    },
  ],
};

// Initialize answers with initial data
const answers = reactive<Record<number, string>>(
    props.initialData || {}
);

// Watch for changes in initialData prop and update answers
watch(() => props.initialData, (newData) => {
    if (newData) {
        Object.assign(answers, newData);
    }
}, { immediate: true });

// Watch answers and emit updates
watch(answers, (newAnswers) => {
    emits("update-form", { ...newAnswers });
}, { deep: true });

const handleAnswerChange = (questionId: number, value: string) => {
    answers[questionId] = value;
};
</script>

<template>
    <div class="space-y-8">
        <div
            v-for="question in questions[section]"
            :key="question.id"
            class="mb-6"
        >
            <p class="mb-4 font-semibold text-base text-gray-800">
                {{ question.id }}. {{ question.text }}
            </p>
            <div class="flex flex-col gap-3">
                <label
                    v-for="option in question.options"
                    :key="option"
                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                    <input
                        type="radio"
                        :name="'q' + section + '_' + question.id"
                        :value="option"
                        :checked="answers[question.id] === option"
                        @change="handleAnswerChange(question.id, option)"
                        class="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span class="text-gray-700">{{ option }}</span>
                </label>
            </div>
        </div>
    </div>
</template>
