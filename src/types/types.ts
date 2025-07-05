export type QuestionType = "radio" | "select" | "checkbox" | "text";

export interface IOption {
  text: string;
  value: string;
}

export type Q2SelectionType = 'skin' | 'joint' | 'digestion';

export interface IQuestion<T> {
    id: number;
    text: string;
    model: keyof T;
    type: 'radio' | 'select' | 'text';
    options?: Array<{
        text: string;
        value: string;
    }>;
    placeholder?: string;
    required?: boolean;
}

export interface FormDataQ1 {
  petType: string | null;         // 狗 / 貓
  petName: string | null;         // 宠物名稱
  petBreed: string | null;        // 品種（自由填寫）
  petAge: string | null;          // 年齡區間
  petGender: string | null;       // 性別
  petWeight: string | null;       // 體重區間
  petBodyType: string | null;     // 體型（過瘦/正常/過胖）
}

export interface FormDataQ2 {
  // Skin Questions (skin1, skin2, skin3, skin4, skin5)
  skin1: string | null;    // 毛髮狀況
  skin2: string | null;    // 是否搔癢或舔咬身體？
  skin3: string | null;    // 有無異常氣味或皮屑？
  skin4: string | null;    // 掉毛或搔癢集中在哪個部位？
  skin5: string | null;    // 是否曾更換洗毛精、床墊、環境等？
  
  // Joint Questions (joint1, joint2, joint3, joint4, joint5)
  joint1: string | null;   // 走路時是否有異常？
  joint2: string | null;   // 是否抗拒跳高、上下樓？
  joint3: string | null;   // 是否聽見關節「喀喀聲」？
  joint4: string | null;   // 出現問題的時段？
  joint5: string | null;   // 有無過往診斷過關節退化 / 骨骼問題？
  
  // Digestion Questions (digestion1, digestion2, digestion3, digestion4, digestion5)
  digestion1: string | null;  // 食慾情況
  digestion2: string | null;  // 嘔吐狀況
  digestion3: string | null;  // 排便狀況
  digestion4: string | null;  // 是否有吃異物或人類食物？
  digestion5: string | null;  // 最近是否更換食物或營養補充？
}
