<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{ 
    label: string;
    value: string | null;
    optionClass?: string;
    props?: Record<string, any>;
}>();

const emits = defineEmits<{
    (e: "update:value", value: string | null): void;
}>();

const input = ref<string | null>(null);

watch(() => input.value, 
    (value) => {
        emits("update:value", value);
    }
);
</script>

<template>
    <div class="flex flex-col mb-4">
        <label class="mb-1">{{ label }}</label>
        <input
            type="text"
            v-model="input"
            :class="['w-full border border-gray-400 rounded-xl px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                optionClass]"
            v-bind="props"
        />
    </div>
</template>
