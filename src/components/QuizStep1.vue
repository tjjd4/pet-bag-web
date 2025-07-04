<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { groupComponentMap } from "./groupComponentMap";
import { type IQuestion } from "../types/types";
import { type FormDataQ1 } from "../types/formData";

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
        label: "",
        model: "petName",
        type: "text",
        options: [],
        props: {
            placeholder: "請輸入寵物名稱",
        },
    },
    {
        label: "寵物年齡是幾歲？",
        model: "petAge",
        type: "select",
        options: [
            { text: "0-1 歲 (幼年)", value: "age_0_1" },
            { text: "2-3 歲 (幼年)", value: "age_2_3" },
            { text: "4-5 歲 (成年)", value: "age_4_5" },
            { text: "6-7 歲 (成年)", value: "age_6_7" },
            { text: "8-9 歲 (成年)", value: "age_8_9" },
            { text: "10-12 歲 (老年)", value: "age_10_12" },
            { text: "12 歲以上 (老年)", value: "age_12_plus" },
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
        type: "select",
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
        console.log(`[QuizStep1] ${form}`);
        emits("updateForm", form);
        props.nextStep();
    } else {
        console.log(
            `[QuizStep1] Not all questiones are anwsered.\n ${form.petName}, ${form.petAge}, ${form.petGender}, ${form.petType}, ${form.petBreed}, ${form.petWeight}, ${form.petBodyType}`,
        );
        alert("請完成所有必填項目。");
    }
};
</script>

<template>
    <div class="min-h-screen bg-white px-4 py-6 flex flex-col">
            <h1 class="text-xl font-semibold text-gray-800 mb-6 text-left">寵物基本資料卡</h1>
            <div v-for="question in questions" :key="question.label" class="text-center mb-6">
                <div class="flex justify-center items-center">
                    <component
                        :is="groupComponentMap[question.type]"
                        :label="question.label"
                        :options="question.options"
                        v-model:value="form[question.model as keyof FormDataQ1]"
                        class="w-full max-w-xs"
                        :optionClass="'flex justify-center items-center'"
                        :props="question.props"
                    />
                </div>
                <p v-if="v$[question.model]?.$error" class="text-red-500 text-sm mt-1">
                    此欄位為必填。
                </p>
            </div>
            <div class="flex flex-row-reverse justify-between mt-6">
                <button
                    @click="handleSubmit"
                    class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    下一題
                </button>
            </div>
    </div>
</template>
