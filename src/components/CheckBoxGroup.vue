<script setup lang="ts">
import { ref, watch } from "vue";
import { type IOption } from "../types/types.ts";

defineProps<{
    label: string;
    options: IOption[];
    value: string[];
}>();

const emits = defineEmits<{
    (e: "update:value", value: string[]): void;
}>();

const selected = ref<string[]>([]);

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
        <div class="flex flex-wrap gap-4">
            <label
                v-for="option in options"
                :key="option.value"
                class="flex items-center gap-2 cursor-pointer"
            >
                <input
                    type="checkbox"
                    :value="option.value"
                    v-model="selected"
                    class="hidden"
                />
                <span
                    :class="[
                        'w-4 h-4 flex items-center justify-center border-2 rounded',
                        selected.includes(option.value)
                            ? 'bg-teal-600'
                            : 'bg-gray-200',
                    ]"
                ></span>
                {{ option.text }}
            </label>
        </div>
    </div>
</template>