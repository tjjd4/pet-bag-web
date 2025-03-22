<script setup lang="ts">
import { ref } from "vue";

defineProps<{ label: string; unit?: string }>();
const value = ref("");
</script>

<template>
    <div class="flex flex-col mb-4">
        <label class="mb-1">{{ label }}</label>
        <div class="flex items-center border rounded-lg overflow-hidden">
            <input
                type="text"
                v-model="value"
                class="flex-1 p-2 outline-none"
            />
            <span v-if="unit" class="bg-gray-200 px-3 py-2">{{ unit }}</span>
        </div>
    </div>
</template>
