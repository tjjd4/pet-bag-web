export interface FormDataQ1 {
  petType: string | null;         // 狗 / 貓
  petName: string | null;         // 宠物名稱
  petBreed: string | null;        // 品種（自由填寫）
  petAge: string | null;          // 年齡區間
  petGender: string | null;       // 性別
  petWeight: string | null;       // 體重區間
  petBodyType: string | null;     // 體型（過瘦/正常/過胖）
}

export interface FormDataPhase2 {
  skin: Record<number, string>;
  joint: Record<number, string>;
  digestion: Record<number, string>;
}
