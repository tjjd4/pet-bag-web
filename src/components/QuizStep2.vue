<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { groupComponentMap } from "./groupComponentMap";
import { type IQuestion } from "../types/types.ts";
import { type FormDataQ2 } from "../types/formData";

const props = defineProps<{
    nextStep: () => void;
    prevStep: () => void;
}>();

const emits = defineEmits<{
    (e: "updateForm", formData: FormDataQ2): void;
}>();

const form = reactive<FormDataQ2>({
    petMeals: null,
    petFoodType: null,
    petAllergies: null,
    waterIntake: null,
    activityLevel: null,
    frequentOuting: null,
});

const rules: Record<keyof FormDataQ2, any> = {
    petMeals: { required },
    petFoodType: { required },
    petAllergies: { required },
    waterIntake: { required },
    activityLevel: { required },
    frequentOuting: { required },
};

const questions: IQuestion<FormDataQ2>[] = [
    {
        label: "寵物一天吃幾餐？",
        model: "petMeals",
        type: "radio",
        options: [
            { text: "1餐", value: "one_meal" },
            { text: "早晚2餐", value: "two_meals" },
            { text: "一天3餐", value: "three_meals" },
            { text: "吃到飽模式", value: "free_feeding" },
        ],
    },
    {
        label: "平時是吃什麼形式的正餐？",
        model: "petFoodType",
        type: "radio",
        options: [
            { text: "乾糧飼料", value: "dry_food" },
            { text: "罐頭", value: "canned_food" },
            { text: "鮮食(自己煮菜煮肉)", value: "home_cooked" },
            { text: "生食", value: "raw_food" },
        ],
    },
    {
        label: "寵物對什麼食物過敏，不喜歡吃？",
        model: "petAllergies",
        type: "radio",
        options: [
            { text: "無", value: "none" },
            { text: "容易過敏1", value: "allergen_1" },
            { text: "容易過敏2", value: "allergen_2" },
        ],
    },
    {
        label: "飲水量：",
        model: "waterIntake",
        type: "radio",
        options: [
            { text: "少 (幾乎不主動喝水)", value: "low" },
            { text: "適中", value: "medium" },
            { text: "多 (特別愛喝水)", value: "high" },
        ],
    },
    {
        label: "活動量：",
        model: "activityLevel",
        type: "radio",
        options: [
            { text: "低 (大部分時間都躺著)", value: "low" },
            { text: "中", value: "medium" },
            { text: "高 (每天運動超過1小時)", value: "high" },
        ],
    },
    {
        label: "是否經常外出：",
        model: "frequentOuting",
        type: "radio",
        options: [
            { text: "是 (散步/旅行/其他)", value: "yes" },
            { text: "否 (主要在家)", value: "no" },
        ],
    },
];

const v$ = useVuelidate(rules, form);

const handleSubmit = () => {
    v$.value.$validate();
    if (!v$.value.$invalid) {
        console.log(`[QuizStep1] ${form}`);
        emits("updateForm", form);
        props.nextStep();
    } else {
        console.log(`[QuizStep1] Not all questiones are anwsered.`);
        alert("請完成所有必填項目。");
    }
};
</script>

<template>
    <div v-for="question in questions" :key="question.label">
        <component
            :is="groupComponentMap[question.type]"
            :label="question.label"
            :options="question.options"
            v-model:value="form[question.model as keyof FormDataQ2]"
            class="my-5"
        />
        <p v-if="v$[question.model]?.$error" class="text-red-500">
            此欄位為必填。
        </p>
    </div>
    <div class="flex flex-row-reverse justify-between mt-6">
        <button
            @click="handleSubmit"
            class="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
        >
            下一題
        </button>
        <button
            @click="prevStep"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
            上一步
        </button>
    </div>
</template>
