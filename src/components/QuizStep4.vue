<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { groupComponentMap } from "./groupComponentMap";
import { type IQuestion } from "../types/types.ts";
import { type FormDataQ3 } from "../types/formData";

const props = defineProps<{
    nextStep: () => void;
    prevStep: () => void;
}>();

const emits = defineEmits<{
    (e: "updateForm", formData: FormDataQ3): void;
}>();

const form = reactive<FormDataQ3>({
    appetite: null,
    metabolism: null,
    skinCondition: null,
    furCondition: null,
    neutered: null,
});

const rules: Record<string, any> = {
    appetite: { required },
    metabolism: { required },
    skinCondition: { required },
    furCondition: { required },
    neutered: { required },
};

const questions: IQuestion<FormDataQ3>[] = [
    {
        label: "食慾",
        model: "appetite",
        type: "radio",
        options: [
            { text: "偏食", value: "picky" },
            { text: "正常", value: "normal" },
            { text: "貪吃", value: "overeating" },
        ],
    },
    {
        label: "新陳代謝狀況",
        model: "metabolism",
        type: "radio",
        options: [
            { text: "活力高", value: "high_energy" },
            { text: "一般", value: "average" },
            { text: "容易疲勞", value: "tired" },
        ],
    },
    {
        label: "皮膚狀況",
        model: "skinCondition",
        type: "radio",
        options: [
            { text: "無異常", value: "normal" },
            { text: "乾燥", value: "dry" },
            { text: "脫皮", value: "peeling" },
            { text: "發紅搔癢", value: "itchy_red" },
        ],
    },
    {
        label: "毛髮狀態",
        model: "furCondition",
        type: "radio",
        options: [
            { text: "光澤亮麗", value: "shiny" },
            { text: "暗淡粗糙", value: "dull" },
            { text: "掉毛多", value: "hair_loss" },
            { text: "無毛髮", value: "no_hair" },
        ],
    },
    {
        label: "是否已絕育",
        model: "neutered",
        type: "radio",
        options: [
            { text: "是", value: "yes" },
            { text: "否", value: "no" },
        ],
    },
];

const v$ = useVuelidate(rules, form);

const handleSubmit = () => {
    v$.value.$validate();
    if (!v$.value.$invalid) {
        console.log(`[QuizStep3]`, form);
        emits("updateForm", form);
        props.nextStep();
    } else {
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
            v-model:value="form[question.model as keyof FormDataQ3]"
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