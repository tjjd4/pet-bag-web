<script setup lang="ts">
import { ref } from "vue";
import QuizStep1 from "./QuizStep1.vue";
import { type FormDataQ1 } from "../types/types";

const props = defineProps<{
    initialData?: FormDataQ1 | null;
}>();

const emits = defineEmits<{
    (e: "phase-complete", data: FormDataQ1): void;
}>();

const formDataQ1 = ref<FormDataQ1 | null>(props.initialData || null);

const handleFormDataQ1Update = (data: FormDataQ1) => {
    formDataQ1.value = data;
    emits("phase-complete", data);
};

</script>

<template>
    <div>
        <QuizStep1
            :initial-data="formDataQ1"
            @update-form="handleFormDataQ1Update"
        />
    </div>
</template>
