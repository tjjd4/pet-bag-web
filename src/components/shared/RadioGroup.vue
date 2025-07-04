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
        <div :class="['flex flex-wrap gap-4', optionClass]">
            <label
                v-for="option in options"
                :key="option.value"
                class="cursor-pointer"
            >
                <input
                    type="radio"
                    :value="option.value"
                    v-model="selected"
                    class="hidden"
                />
                <div
                    :class="[
                        'px-4 py-2 rounded-lg border transition-colors duration-200',
                        selected === option.value
                            ? 'bg-teal-700 text-white border-teal-700'
                            : 'bg-transparent text-gray-700 border-gray-300 hover:bg-teal-200 hover:border-teal-400'
                    ]"
                    v-bind="props"
                >
                    {{ option.text }}
                </div>
            </label>
        </div>
    </div>
</template>
