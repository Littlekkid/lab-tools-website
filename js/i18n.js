// 1. 语言字典定义
export const translations = {
    // 德语 (默认)
    de: {
        "appTitle": "Lab Tools",
        "pairingTitle": "Basenpaarung",
        "pairingModeLabel": "Paarungsmodus auswählen:",
        "inputSequenceLabel": "Eingabesequenz:",
        "invalidSequence": "Ungültige Sequenz. Bitte geben Sie eine gültige DNA- oder RNA-Sequenz ein.",
        "btnRunPairing": "Paarung starten",
        "resultLabel": "Ergebnis:",
        "translationTitle": "Protein finden",
        "sourceTypeLabel": "Quelltyp auswählen:",
        "unitTab": "Einheitenumrechnung",
        "noAugError": "Kein Start-Codon (AUG) gefunden.",
        "btnRunTranslation": "Übersetzen"
    },
    
    // 英语
    en: {
        "appTitle": "Lab Tools",
        "pairingTitle": "Base Pairing",
        "pairingModeLabel": "Select Pairing Mode:",
        "inputSequenceLabel": "Input Sequence:",
        'invalidSequence': 'Invalid sequence. Please enter a valid DNA or RNA sequence.',
        "btnRunPairing": "Pair",
        "resultLabel": "Result:",
        "translationTitle": "Find Protein",
        "sourceTypeLabel": "Select Source Type:",
        "unitTab": "Unit Conversion",
        "noAugError": "No start codon (AUG) found.",
        "btnRunTranslation": "Translate"
    }
};

// 当前选中的语言，默认德语
let currentLang = 'en';

// 2. 核心函数 A：改变当前语言
export function setLanguage(lang) {
    currentLang = lang;
    updatePageLanguage(); // 切换语言后立马刷新页面上的所有文字
}

// 3. 核心函数 B：根据 Key 获取当前语言的具体文字 (供 JS 逻辑如 translateRNA 报错时使用)
export function getText(key) {
    return translations[currentLang][key] || key;
}

// 4. 核心函数 C：自动扫描 HTML 并更新界面所有的静态文字
export function updatePageLanguage() {
    // 找出所有带有 data-i18n 属性的 HTML 标签
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        // 获取这个标签绑定的 key (比如 "title" 或 "pairingTab")
        const key = element.getAttribute('data-i18n');
        
        // 查字典并替换标签里的文字
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}