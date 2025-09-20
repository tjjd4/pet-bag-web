<script setup lang="ts">
import { ref } from "vue";
import QuizStep2 from "./QuizStep2.vue";
import { type FormDataQ2 } from "../types/types";

const props = defineProps<{
    initialData?: FormDataQ2 | null;
}>();

const emits = defineEmits<{
    (e: "go-back"): void;
    (e: "phase-complete", data: FormDataQ2): void;
}>();

const formDataQ2 = ref<FormDataQ2 | null>(props.initialData || null);

const handleFormDataQ2Update = (data: FormDataQ2) => {
    formDataQ2.value = data;
    emits("phase-complete", data);
};

const goBack = () => {
    emits("go-back");
};
</script>

<template>
    <div>
        <QuizStep2
            :goBack="goBack"
            :initial-data="formDataQ2"
            @update-form="handleFormDataQ2Update"
        />
    </div>
</template>
