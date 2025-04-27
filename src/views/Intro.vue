<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToQuiz = () => {
    router.push("/quiz");
};
</script>

<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-[#fff] p-6"
    >
        <div class="max-w-lg w-full bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            <h1 class="text-xl font-semibold text-center mb-4">Hi! 毛孩家人們</h1>
            <p class="text-center mb-4">本系統採用 AI 模型及數據分析技術，結合國際營養學會公認評估模型，提供更準確的健康和飲食建議。<br/>讓毛孩吃得更健康，更快樂！</p>
            <p class="text-center mb-4">透過下列問題，PETBAG 將分析毛孩的身體狀況，提供更準確的保健建議：</p>
            <ul class="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6 list-disc list-inside">
                <li class="text-base text-gray-700">基本資料</li>
                <li class="text-base text-gray-700">生活習慣</li>
                <li class="text-base text-gray-700">健康狀況</li>
                <li class="text-base text-gray-700">需求 & 目標</li>
            </ul>
            <div class="flex justify-center mt-6">
                <button
                    class="bg-gray-400 text-white px-8 py-3 rounded-xl text-lg font-bold shadow-md hover:bg-gray-500 transition duration-300"
                    @click="navigateToQuiz"
                >
                    開始測驗
                </button>
            </div>
        </div>
    </div>
</template>
