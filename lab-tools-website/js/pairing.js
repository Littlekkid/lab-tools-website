import { dnaToDnaPairs, dnaToRnaPairs, rnaToRnaPairs } from './table.js';
import { getText } from './i18n.js';

// 初始化模块事件监听（在 pairing.html 被加载到 DOM 后执行）
export function initPairingModule() {
    const pairBtn = document.getElementById('btn-pair');
    if (pairBtn) {
        pairBtn.addEventListener('click', handlePairing);
    }
}

function handlePairing() {
    const modeSelect = document.getElementById('pairing-mode');
    const inputArea = document.getElementById('pairing-input');
    const resultBox = document.getElementById('pairing-result');

    // 1. 获取输入并转为大写，去除空格
    const rawSeq = inputArea.value.trim().toUpperCase();
    const mode = modeSelect.value;

    if (!rawSeq) {
        resultBox.textContent = '';
        return;
    }

    // 2. 根据模式选择对应的字典映射
    let pairTable;
    if (mode === 'dna-dna') {
        pairTable = dnaToDnaPairs;
    } else if (mode === 'dna-rna') {
        pairTable = dnaToRnaPairs;
    } else if (mode === 'rna-rna') {
        pairTable = rnaToRnaPairs;
    }

    // 3. 逐个碱基配对
    let pairedArray = [];
    let isValid = true;

    for (let i = 0; i < rawSeq.length; i++) {
        const char = rawSeq[i];
        const matched = pairTable[char];

        if (matched) {
            pairedArray.push(matched);
        } else {
            // 遇到未知碱基/非法字符
            isValid = false;
            break;
        }
    }

    // 4. 判断结果并渲染到 UI
    if (!isValid) {
        resultBox.className = 'result-box error-text';
        resultBox.textContent = getText('invalidSequence'); // 查多语言字典提示非法字符
        return;
    }

    // 5. 将互补链反转 (5' -> 3' 方向) 并拼接成字符串
    const finalResult = pairedArray.reverse().join('');

    resultBox.className = 'result-box success-text';
    resultBox.textContent = finalResult;
}