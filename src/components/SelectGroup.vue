<script setup lang="ts">
import { ref, watch } from "vue";
import { type IOption } from "../types/types.ts"

defineProps<{
  label: string;
  options: IOption[];
  value: string | null;
}>();

const emits = defineEmits<{
  (e: 'update:value', value: string | null): void;
}>();

const selected = ref<string | null>(null);

watch(() => selected.value, (value) => {
  emits('update:value', value);
});
</script>

<template>
  <div>
    <p class="mb-2">{{ label }}</p>
    <div class="flex flex-wrap gap-4">
      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option v-for="option in options" :key="option.value">{{ option.text }}</option>
      </select>
    </div>
  </div>
</template>