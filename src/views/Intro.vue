<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToQuiz = () => {
    router.push("/quiz");
};
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-white p-6"
    >
        <h1 class="text-xl font-semibold text-center mb-4">Hi! 毛孩家人們</h1>
        <p class="text-center mb-4">
            本系統採用 AI 模型及數據分析技術，結合國際營養學會公認評估模型，
            提供更準確的健康和飲食建議。<br />
            讓毛孩吃得更健康，更快樂！
        </p>
        <p class="text-center mb-4">
            透過問卷中的問題，PETBAG 將分析毛孩的身體狀況，提供更準確的保健建議！
        </p>
        <div class="flex justify-center mt-6">
            <button
                class="bg-gray-400 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-md hover:bg-gray-500 transition duration-300"
                @click="navigateToQuiz"
            >
                立即評估
            </button>
        </div>
    </div>
</template>
