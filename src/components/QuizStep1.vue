<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { groupComponentMap } from "./groupComponentMap";
import { type IQuestion } from "../types/types";
import { type FormDataQ1 } from "../types/formData";

const props = defineProps<{
    nextStep: () => void;
}>();

const emits = defineEmits<{
    (e: "updateForm", formData: FormDataQ1): void;
}>();

const form = reactive<FormDataQ1>({
    petType: null,
    petAge: null,
    petGender: null,
    petBreed: null,
    petWeight: null,
    petBodyType: null,
});

const rules: Record<keyof FormDataQ1, any> = {
    petType: { required },
    petAge: { required },
    petGender: { required },
    petBreed: { required },
    petWeight: { required },
    petBodyType: { required },
};

const questions: IQuestion<FormDataQ1>[] = [
    {
        label: "您的愛寵是？",
        model: "petType",
        type: "radio",
        options: [
            { text: "貓咪", value: "cat" },
            { text: "狗狗", value: "dog" },
        ],
    },
    {
        label: "寵物年齡是幾歲？",
        model: "petAge",
        type: "radio",
        options: [
            { text: "0-2 歲 (幼年)", value: "age_0_2" },
            { text: "3-5 歲 (成年)", value: "age_3_5" },
            { text: "5-10 歲 (中年)", value: "age_5_10" },
            { text: "10+ 歲 (老年)", value: "age_10_plus" },
        ],
    },
    {
        label: "寵物的生理性別？",
        model: "petGender",
        type: "radio",
        options: [
            { text: "男", value: "male" },
            { text: "女", value: "female" },
        ],
    },
    {
        label: "寵物是什麼品種？",
        model: "petBreed",
        type: "select",
        options: [
            { text: "柴犬", value: "shiba_inu" },
            { text: "哈士奇", value: "siberian_husky" },
            { text: "拉布拉多", value: "labrador_retriever" },
            { text: "黃金獵犬", value: "golden_retriever" },
            { text: "柯基", value: "pembroke_welsh_corgi" },
            { text: "鬆獅犬", value: "chow_chow" },
            { text: "貴賓犬", value: "poodle" },
            { text: "法鬥", value: "french_bulldog" },
            { text: "秋田犬", value: "akita" },
            { text: "邊境牧羊犬", value: "border_collie" },
            { text: "英短", value: "british_shorthair" },
            { text: "美短", value: "american_shorthair" },
            { text: "布偶貓", value: "ragdoll" },
            { text: "緬因貓", value: "maine_coon" },
            { text: "加菲貓", value: "exotic_shorthair" },
            { text: "挪威森林貓", value: "norwegian_forest_cat" },
            { text: "孟加拉貓", value: "bengal" },
            { text: "蘇格蘭摺耳貓", value: "scottish_fold" },
            { text: "暹羅貓", value: "siamese" },
            { text: "俄羅斯藍貓", value: "russian_blue" },
        ],
    },
    {
        label: "寵物的體重是多少？",
        model: "petWeight",
        type: "radio",
        options: [
            { text: "1-5 公斤", value: "weight_1_5" },
            { text: "5-10 公斤", value: "weight_5_10" },
            { text: "10-15 公斤", value: "weight_10_15" },
            { text: "15-20 公斤", value: "weight_15_20" },
            { text: "20-25 公斤", value: "weight_20_25" },
        ],
    },
    {
        label: "寵物的體型是？",
        model: "petBodyType",
        type: "radio",
        options: [
            { text: "過瘦", value: "underweight" },
            { text: "正常", value: "normal" },
            { text: "過胖", value: "overweight" },
        ],
    },
];

const v$ = useVuelidate(rules, form);

const handleSubmit = () => {
    v$.value.$validate();
    if (!v$.value.$invalid) {
        console.log(`[QuizStep0] ${form}`);
        emits("updateForm", form);
        props.nextStep();
    } else {
        console.log(
            `[QuizStep0] Not all questiones are anwsered.\n ${form.petAge}, ${form.petGender}, ${form.petType}`,
        );
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
            v-model:value="form[question.model as keyof FormDataQ1]"
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
    </div>
</template>
