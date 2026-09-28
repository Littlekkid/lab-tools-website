// 1. 语言字典定义
export const translations = {
    // 德语 (默认)
    de: {
        "appTitle": "Lab Tools",
        "tabPairing": "Basenpaarung",
        "tabCalculator": "Laborrechner",
        //Base Pairing
        "pairingTitle": "Basenpaarung",
        "pairingModeLabel": "Paarungsmodus auswählen:",
        "inputSequenceLabel": "Eingabesequenz:",
        "invalidSequence": "Ungültige Sequenz. Bitte geben Sie eine gültige DNA- oder RNA-Sequenz ein.",
        "btnRunPairing": "Paarung starten",
        "resultLabel": "Ergebnis:",

        "translationTitle": "Protein finden",
        "sourceTypeLabel": "Quelltyp auswählen:",
        "noAugError": "Kein Start-Codon (AUG) gefunden.",
        "btnRunTranslation": "Übersetzen",
        // Lab Calculator
        "calcTitle": "Masse- / Molaritätsrechner",
        "labelMw": "Molare Masse (g/mol):",
        "labelConc": "Zielkonzentration (mM):",
        "labelVol": "Zielvolumen (mL):",
        "btnCalculate": "Berechnen",
        "labelResult": "Benötigte Feststoffmasse:",

        "dilutionTitle": "Stammlösungsverdünnungsrechner (C1V1 = C2V2)",
        "labelC1": "Stammlösungskonzentration (C1, mM):",
        "labelC2": "Zielkonzentration (C2, mM):",
        "labelV2": "ZiEndvolumen (V2, mL):",
        "labelDilutionResult": "Ansetzschema:",
        "labelStockVol": "Benötigtes Stammvolumen (V1):",
        "labelSolventVol": "Lösungsmittelvolumen:",

        "centrifugeTitle": "Zentrifugen-Drehzahl / Zentrifugalkraft-Umrechner (RPM ↔ g)",
        "labelRadius": "Rotorradius (r, cm):",
        "labelRpm": "Drehzahl (RPM):",
        "labelRcf": "Zentrifugalkraft (× g):",
        "btnCalcRcf": "Kraft (g) aus RPM berechnen",
        "btnCalcRpm": "Drehzahl (RPM) aus g berechnen",
        "labelCentrifugeResult": "Umrechnungsergebnis:",
        "labelResultRpm": "Berechnete Drehzahl:",
        "labelResultRcf": "Berechnete Kraft:",

        "quantTitle": "Spektralphotometrische Quantifizierung (A260)",
        "labelSampleType": "Probenart:",
        "optDsDna": "dsDNA (50 µg/mL pro A260)",
        "optSsDna": "ssDNA / Oligo (33 µg/mL pro A260)",
        "optRna": "RNA (40 µg/mL pro A260)",
        "labelA260": "Extinktion (A260):",
        "labelDilFactor": "Verdünnungsfaktor:",
        "labelQuantResult": "Konzentrationsergebnis:",
        "labelResultConc": "Berechnete Konzentration:"
    },

    // 英语
    en: {
        "appTitle": "Lab Tools",
        "tabPairing": "Base Pairing",
        "tabCalculator": "Lab Calculators",
        //Base Pairing
        "pairingTitle": "Base Pairing",
        "pairingModeLabel": "Select Pairing Mode:",
        "inputSequenceLabel": "Input Sequence:",
        'invalidSequence': 'Invalid sequence. Please enter a valid DNA or RNA sequence.',
        "btnRunPairing": "Pair",
        "resultLabel": "Result:",

        "translationTitle": "Find Protein",
        "sourceTypeLabel": "Select Source Type:",
        "noAugError": "No start codon (AUG) found.",
        "btnRunTranslation": "Translate",
        // Lab Calculator
        "calcTitle": "Mass / Molarity Calculator",
        "labelMw": "Molar Mass (g/mol):",
        "labelConc": "Desired Concentration (mM):",
        "labelVol": "Desired Volume (mL):",
        "btnCalculate": "Calculate",
        "labelResult": "Required Solid Mass:",

        "dilutionTitle": "Stock Dilution Calculator (C1V1 = C2V2)",
        "labelC1": "Stock Concentration (C1, mM):",
        "labelC2": "Target Concentration (C2, mM):",
        "labelV2": "Target Final Volume (V2, mL):",
        "labelDilutionResult": "Preparation Recipe:",
        "labelStockVol": "Stock Volume (V1):",
        "labelSolventVol": "Solvent Volume:",

        "centrifugeTitle": "Centrifuge Speed / Force Converter (RPM ↔ g)",
        "labelRadius": "Rotor Radius (r, cm):",
        "labelRpm": "Speed (RPM):",
        "labelRcf": "Centrifugal Force (× g):",
        "btnCalcRcf": "Calculate Force (g) from RPM",
        "btnCalcRpm": "Calculate Speed (RPM) from g",
        "labelCentrifugeResult": "Conversion Result:",
        "labelResultRpm": "Calculated Speed:",
        "labelResultRcf": "Calculated Force:",

        "quantTitle": "Spectrophotometric Quantification (A260)",
        "labelSampleType": "Sample Type:",
        "optDsDna": "dsDNA (50 µg/mL per A260)",
        "optSsDna": "ssDNA / Oligo (33 µg/mL per A260)",
        "optRna": "RNA (40 µg/mL per A260)",
        "labelA260": "Absorbance (A260):",
        "labelDilFactor": "Dilution Factor:",
        "labelQuantResult": "Concentration Result:",
        "labelResultConc": "Calculated Concentration:"
    }
};

// 当前选中的语言，默认是英语
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