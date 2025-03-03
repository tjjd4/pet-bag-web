<script setup lang="ts">
import { ref } from "vue";
import { type IOptions } from "../types/types.ts"

defineProps<{ label: string; options: IOptions[] }>();
const selected = ref<string | null>(null);
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