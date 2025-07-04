<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { type FormDataQ1, type FormDataPhase2 } from "../types/formData";
import { type FormDataPhase2Selection } from "../types/types";

const router = useRouter();
const phase1Data = ref<FormDataQ1 | null>(null);
const phase2Data = ref<FormDataPhase2 | null>(null);

// Load data from sessionStorage on component mount
onMounted(() => {
    const storedData = sessionStorage.getItem('quizData');
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            phase1Data.value = parsedData.phase1;
            phase2Data.value = parsedData.phase2;
        } catch (error) {
            console.error('Error parsing quiz data:', error);
            // Redirect back to quiz if data is invalid
            router.push('/quiz');
        }
    } else {
        // No data found, redirect to quiz
        router.push('/quiz');
    }
});

// Calculate completion percentage
const phase2Completion = computed(() => {
    if (!phase2Data.value) return 0;
    
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    const sections: FormDataPhase2Selection[] = ['skin', 'joint', 'digestion'];
    sections.forEach(section => {
        totalQuestions += 5; // Each section has 5 questions
        answeredQuestions += Object.keys(phase2Data.value![section] || {}).length;
    });
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
});

// Analyze health concerns based on answers
const healthAnalysis = computed(() => {
    if (!phase2Data.value) return [];
    
    const concerns = [];
    
    // Skin analysis
    const skinAnswers = phase2Data.value.skin || {};
    if (skinAnswers[1]?.includes('掉毛') || skinAnswers[2] === '頻繁' || skinAnswers[3] !== '無') {
        concerns.push({
            category: '皮膚健康',
            level: 'attention',
            message: '建議關注皮膚狀況，可能需要調整護理方式或諮詢獸醫師'
        });
    }
    
    // Joint analysis
    const jointAnswers = phase2Data.value.joint || {};
    if (jointAnswers[1] !== '無異常' || jointAnswers[2] === '完全抗拒' || jointAnswers[3] === '經常') {
        concerns.push({
            category: '關節健康',
            level: 'warning',
            message: '發現關節問題跡象，建議盡快諮詢獸醫師進行檢查'
        });
    }
    
    // Digestion analysis
    const digestionAnswers = phase2Data.value.digestion || {};
    if (digestionAnswers[1] !== '吃得正常' || digestionAnswers[2] === '頻繁（3次以上/週）' || digestionAnswers[3] !== '成形正常') {
        concerns.push({
            category: '消化健康',
            level: 'attention',
            message: '消化系統需要注意，建議調整飲食或諮詢獸醫師'
        });
    }
    
    return concerns;
});

// Generate recommendations based on pet data
const recommendations = computed(() => {
    if (!phase1Data.value) return [];
    
    const recs = [];
    
    // Age-based recommendations
    if (phase1Data.value.petAge?.includes('老年')) {
        recs.push('針對高齡寵物，建議增加關節保健和定期健康檢查');
    }
    
    // Weight-based recommendations
    if (phase1Data.value.petBodyType === 'overweight') {
        recs.push('建議控制體重，適度運動和飲食管理');
    } else if (phase1Data.value.petBodyType === 'underweight') {
        recs.push('建議增加營養攝取，確保充足的熱量和蛋白質');
    }
    
    // Default recommendations
    recs.push('定期進行健康檢查，保持良好的生活習慣');
    recs.push('維持適當的運動量和均衡飲食');
    
    return recs;
});

const restartQuiz = () => {
    // Clear stored data
    sessionStorage.removeItem('quizData');
    router.push('/quiz');
};

const goBackToQuiz = () => {
    router.push('/quiz');
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">
                    🎉 寵物健康評估結果
                </h1>            <p class="text-gray-600">
                <span v-if="phase1Data?.petName">
                    根據您提供的資料，我們為 <span class="font-semibold text-purple-600">{{ phase1Data.petName }}</span> 準備了專屬的健康建議
                </span>
                <span v-else>
                    根據您提供的資料，我們為您的寵物準備了專屬的健康建議
                </span>
            </p>
            </div>

            <!-- Basic Info Summary -->
            <div v-if="phase1Data" class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">基本資料摘要</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center">
                        <p class="text-gray-500 text-sm">類型</p>
                        <p class="font-semibold">{{ phase1Data.petType === 'cat' ? '貓咪' : '狗狗' }}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm">年齡</p>
                        <p class="font-semibold">{{ phase1Data.petAge }}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm">體重</p>
                        <p class="font-semibold">{{ phase1Data.petWeight }}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm">體型</p>
                        <p class="font-semibold">{{ phase1Data.petBodyType }}</p>
                    </div>
                </div>
            </div>

            <!-- Completion Status -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">評估完成度</h2>
                <div class="flex items-center gap-4">
                    <div class="flex-1">
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                class="bg-purple-600 h-3 rounded-full transition-all duration-300"
                                :style="{ width: phase2Completion + '%' }"
                            ></div>
                        </div>
                    </div>
                    <span class="text-lg font-semibold text-purple-600">{{ phase2Completion }}%</span>
                </div>
                <p class="text-gray-600 mt-2">
                    您已完成 {{ phase2Completion }}% 的健康狀況評估
                </p>
            </div>

            <!-- Health Analysis -->
            <div v-if="healthAnalysis.length > 0" class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">健康狀況分析</h2>
                <div class="space-y-4">
                    <div 
                        v-for="concern in healthAnalysis" 
                        :key="concern.category"
                        :class="[
                            'p-4 rounded-lg border-l-4',
                            concern.level === 'warning' 
                                ? 'bg-red-50 border-red-400' 
                                : 'bg-yellow-50 border-yellow-400'
                        ]"
                    >
                        <h3 :class="[
                            'font-semibold mb-2',
                            concern.level === 'warning' ? 'text-red-700' : 'text-yellow-700'
                        ]">
                            {{ concern.category }}
                        </h3>
                        <p :class="[
                            concern.level === 'warning' ? 'text-red-600' : 'text-yellow-600'
                        ]">
                            {{ concern.message }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Recommendations -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">個人化建議</h2>
                <div class="space-y-3">
                    <div 
                        v-for="(rec, index) in recommendations" 
                        :key="index"
                        class="flex items-start gap-3"
                    >
                        <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <p class="text-gray-700">{{ rec }}</p>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    @click="goBackToQuiz"
                    class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    返回修改資料
                </button>
                <button 
                    @click="restartQuiz"
                    class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    重新開始評估
                </button>
                <button 
                    class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    下載結果報告
                </button>
            </div>

            <!-- Disclaimer -->
            <div class="mt-8 text-center text-sm text-gray-500">
                <p>
                    ⚠️ 此評估結果僅供參考，如有健康疑慮請諮詢專業獸醫師
                </p>
            </div>
        </div>
    </div>
</template>
