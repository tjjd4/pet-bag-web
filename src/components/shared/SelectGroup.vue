<script setup lang="ts">
import { ref, watch } from "vue";
import { type IOption } from "../../types/types";

defineProps<{
    label: string;
    options: IOption[];
    value: string | null;
    optionClass?: string;
    props?: Record<string, any>;
}>();

const emits = defineEmits<{
    (e: "update:value", value: string | null): void;
}>();

const selected = ref<string | null>(null);

watch(
    () => selected.value,
    (value) => {
        emits("update:value", value);
    },
);
</script>

<template>
    <div>
        <p class="mb-2">{{ label }}</p>
        <select 
            v-model="selected" 
            v-bind="props"
            :class="['w-full border border-gray-400 rounded-xl px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
                optionClass]"
        >
            <option disabled value="">Please select one</option>
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.text }}
                </option>
            </select>
    </div>
</template>
