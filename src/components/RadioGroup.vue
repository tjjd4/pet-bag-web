<script setup lang="ts">
import { ref } from "vue";
import { type IOptions } from "../types/types.ts";

defineProps<{ label: string; options: IOptions[] }>();
const selected = ref<string | null>(null);
</script>

<template>
  <div>
    <p class="mb-2">{{ label }}</p>
    <div class="flex flex-wrap gap-4">
      <label v-for="option in options" :key="option.value" class="flex items-center gap-2 cursor-pointer">
        <input type="radio" :value="option.value" v-model="selected" class="hidden">
        <span :class="['w-4 h-4 flex items-center justify-center rounded-full border-2', selected === option.value ? 'bg-teal-600' : 'bg-gray-200']"></span>
        {{ option.text }}
      </label>
    </div>
  </div>
</template>