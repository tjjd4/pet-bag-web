<script setup lang="ts">
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { groupComponentMap } from "./groupComponentMap.ts";
import { type IQuestion } from "../types/types.ts";
import { type FormDataQ3 } from "../types/formData.ts";

const props = defineProps<{
    nextStep: () => void;
    prevStep: () => void;
}>();

const emits = defineEmits<{
    (e: "updateForm", formData: FormDataQ3): void;
}>();

const form = reactive<FormDataQ3>({
    stoolCondition: null,
    stoolFrequency: null,
    stressBehaviors: null,
    sensitivityChanges: null,
    stressSources: null,
});

const rules: Record<string, any> = {
    stoolCondition: { required },
    stoolFrequency: { required },
};

const questions: IQuestion<FormDataQ3>[] = [
    {
        label: "便便狀態：",
        model: "stoolCondition",
        type: "radio",
        options: [
            { text: "正常", value: "normal" },
            { text: "偏軟", value: "soft" },
            { text: "偏硬", value: "hard" },
            { text: "腹瀉", value: "diarrhea" },
            { text: "便秘", value: "constipation" },
        ],
    },
    {
        label: "排便頻率：",
        model: "stoolFrequency",
        type: "radio",
        options: [
            { text: "每天 1 次", value: "once_per_day" },
            { text: "1 天多次", value: "multiple_per_day" },
            { text: "2 天一次或更久", value: "every_two_days" },
        ],
    },
    {
        label: "是否有焦慮行為（可複選）：",
        model: "stressBehaviors",
        type: "checkbox",
        options: [
            { text: "舔腳", value: "lick_paws" },
            { text: "咬尾巴", value: "bite_tail" },
            { text: "過度舔毛", value: "over_grooming" },
            { text: "其他（請填寫）", value: "other" },
        ],
        otherField: "otherStressBehavior",
    },
    {
        label: "是否對環境變化敏感（可複選）：",
        model: "sensitivityChanges",
        type: "checkbox",
        options: [
            { text: "易受驚", value: "easily_frightened" },
            { text: "怕聲音", value: "fear_sounds" },
            { text: "其他（請填寫）", value: "other" },
        ],
        otherField: "otherSensitivityChange",
    },
    {
        label: "壓力來源（可複選）：",
        model: "stressSources",
        type: "checkbox",
        options: [
            { text: "環境變動（搬家、新寵物）", value: "environment_change" },
            { text: "煩躁易怒（情緒焦慮、攻擊行為）", value: "irritability" },
            { text: "其他（請填寫）", value: "other" },
        ],
        otherField: "otherStressSource",
    },
];

const v$ = useVuelidate(rules, form);

const handleSubmit = () => {
    v$.value.$validate();
    if (!v$.value.$invalid) {
        console.log(`[QuizStep2]`, form);
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
        <div
            v-if="question.otherField && form[question.model as keyof FormDataQ3]?.includes('other')"
            class="mt-2"
        >
            <input
                v-model="form[question.otherField as keyof FormDataQ3]"
                type="text"
                placeholder="請填寫其他內容"
                class="border p-2 w-full"
            />
        </div>
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