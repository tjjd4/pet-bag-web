<script setup lang="ts">
import { ref } from "vue";
import QuizStep3 from "./QuizStep3.vue";
import { type FormDataQ3 } from "../types/types";

const props = defineProps<{
    initialData?: FormDataQ3 | null;
}>();

const emits = defineEmits<{
    (e: "go-back"): void;
    (e: "phase-complete", data: FormDataQ3): void;
}>();

// Data management
const formDataQ3 = ref<FormDataQ3 | null>(props.initialData || null);

// Handle form updates from QuizStep3
const handleFormDataQ3Update = (updatedData: FormDataQ3) => {
    formDataQ3.value = updatedData;
};

// Handle go back from QuizStep3
const handleGoBack = () => {
    emits("go-back");
};

// Handle phase completion from QuizStep3
const handlePhaseComplete = (data: FormDataQ3) => {
    formDataQ3.value = data;
    emits("phase-complete", data);
};
</script>

<template>
    <div>
        <QuizStep3 
            :initial-data="formDataQ3"
            @update-form="handleFormDataQ3Update"
            @go-back="handleGoBack"
            @phase-complete="handlePhaseComplete"
        />
    </div>
</template>