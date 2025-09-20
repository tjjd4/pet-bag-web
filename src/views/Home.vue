<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToIntro = () => {
    router.push("/intro");
};

const navigateToLogin = () => {
    // 登入邏輯
    console.log("導航到登入頁面");
};

const navigateToRegister = () => {
    // 註冊邏輯
    console.log("導航到註冊頁面");
};
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- 導航欄 -->
        <header class="bg-white shadow-sm">
            <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- 左側導航選項 -->
                    <div class="flex items-center space-x-8">
                        <div class="flex items-center">
                            <a href="/intro" class="text-xl font-bold text-gray-900">🐕</a>
                        </div>
                        <div class="hidden md:flex items-center space-x-6">
                            <a href="#" class="text-gray-700 hover:text-gray-900 text-sm font-medium">
                                所有營養品
                            </a>
                            <a href="#" class="text-gray-700 hover:text-gray-900 text-sm font-medium">
                                討論與專欄
                            </a>
                            <a href="#" class="text-gray-700 hover:text-gray-900 text-sm font-medium">
                                來源
                            </a>
                            <a href="#" class="text-gray-700 hover:text-gray-900 text-sm font-medium">
                                聯絡我們
                            </a>
                        </div>
                    </div>
                    
                    <!-- 右側登入註冊按鈕 -->
                    <div class="flex items-center space-x-4">
                        <button
                            @click="navigateToLogin"
                            class="text-gray-700 hover:text-gray-900 text-sm font-medium"
                        >
                            登入
                        </button>
                        <button
                            @click="navigateToRegister"
                            class="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-200"
                        >
                            註冊
                        </button>
                    </div>
                </div>
            </nav>
        </header>

        <!-- 主要內容區域 -->
        <main class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div class="text-center max-w-4xl mx-auto">
                <!-- 主標題 -->
                <h1 class="text-6xl md:text-7xl font-bold text-gray-900 mb-8">
                    Puppie!
                </h1>
                
                <!-- 副標題描述 -->
                <div class="text-gray-600 text-lg md:text-xl mb-12 space-y-2">
                    <p>本系統採用 AI 演算法及數據分析技術，結合國際營養學會公</p>
                    <p>認權威 FFQs 及 MNA-SF 雙重評估模組</p>
                </div>
                
                <!-- 行動按鈕 -->
                <button
                    @click="navigateToIntro"
                    class="bg-gray-800 text-white px-12 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg"
                >
                    立即評估
                </button>
            </div>
        </main>
    </div>
</template>
