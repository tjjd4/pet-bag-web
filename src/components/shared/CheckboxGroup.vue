<script setup lang="ts">
import { ref, watch } from "vue";
import { type IOption } from "../../types/types";

defineProps<{
    label: string;
    options: IOption[];
    value: string[];
    optionClass?: string;
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
        <div :class="['flex flex-wrap gap-4', optionClass]">
            <label
                v-for="option in options"
                :key="option.value"
                class="cursor-pointer"
            >
                <input
                    type="checkbox"
                    :value="option.value"
                    v-model="selected"
                    class="hidden"
                />
                <div
                    :class="[
                        'px-4 py-2 rounded-lg border transition-colors duration-200',
                        selected.includes(option.value)
                            ? 'bg-cyan-600 text-white border-cyan-600'
                            : 'bg-transparent text-gray-700 border-gray-300 hover:bg-cyan-100 hover:border-cyan-300'
                    ]"
                >
                    {{ option.text }}
                </div>
            </label>
        </div>
    </div>
</template>