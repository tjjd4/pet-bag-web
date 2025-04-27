export interface FormDataQ1 {
  petType: string | null;         // 狗 / 貓
  petBreed: string | null;        // 品種（自由填寫）
  petAge: string | null;          // 年齡區間
  petGender: string | null;       // 性別
  petWeight: string | null;       // 體重區間
  petBodyType: string | null;     // 體型（過瘦/正常/過胖）
}

export interface FormDataQ2 {
  petMeals: string | null;
  petFoodType: string | null;
  petAllergies: string | null;
  waterIntake: string | null;        // 飲水量
  activityLevel: string | null;      // 活動量
  frequentOuting: string | null;     // 是否經常外出
}

export interface FormDataQ3 {
  stoolCondition: string | null;            // 便便狀態
  stoolFrequency: string | null;            // 排便頻率
  stressBehaviors: string[] | null;         // 焦慮行為（可複選）
  sensitivityChanges: string[] | null;      // 對環境變化敏感（可複選）
  stressSources: string[] | null;           // 壓力來源（可複選）
  otherStressBehavior?: string | null;       // 其他焦慮行為
  otherSensitivityChange?: string | null;    // 其他敏感項目
  otherStressSource?: string | null;         // 其他壓力來源
}

export interface FormDataQ4 {
  appetite: string | null;
  metabolism: string | null;
  skinCondition: string | null;
  furCondition: string | null;
  neutered: string | null;
}

export interface FormDataSelection {
  nutrition: string | null;
  exercise: string | null;
  medical: string | null;
  environment: string | null;
}
