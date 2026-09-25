import { findBaseSequence } from './findbase.js';
import { translateFromAug } from './trans.js';
import { getText } from './i18n.js';

// 初始化模块事件监听
export function initPairingModule() {
    const pairBtn = document.getElementById('btn-pair');
    if (pairBtn) {
        pairBtn.addEventListener('click', handlePairing);
    }
    // 2. 蛋白质翻译按钮
    const translateBtn = document.getElementById('btn-translate');
    if (translateBtn) {
        translateBtn.addEventListener('click', handleTranslation);
    }
}

function handlePairing() {
    const modeSelect = document.getElementById('pairing-mode');
    const inputArea = document.getElementById('pairing-input');
    const resultBox = document.getElementById('pairing-result');

    // 1. 获取用户输入
    const rawSeq = inputArea.value.trim().toUpperCase();
    const mode = modeSelect.value;

    if (!rawSeq) {
        resultBox.textContent = '';
        return;
    }

    // 2. 调用算法模块
    const result = findBaseSequence(rawSeq, mode);

    // 3. 处理返回结果并渲染 UI
    if (result === null) {
        resultBox.className = 'result-box error-text';
        resultBox.textContent = getText('invalidSequence');
    } else {
        resultBox.className = 'result-box success-text';
        resultBox.textContent = result;
    }
}
// 蛋白质翻译处理函数
function handleTranslation() {
    const sourceTypeSelect = document.getElementById('source-type');
    const inputArea = document.getElementById('translation-input');
    const resultBox = document.getElementById('translation-result');

    const rawSeq = inputArea.value.trim().toUpperCase();
    const sourceType = sourceTypeSelect.value;

    if (!rawSeq) {
        resultBox.textContent = '';
        return;
    }

    let targetRnaSeq = rawSeq;

    // 根据输入源类型判断是否先跑 findbase 进行转录/配对
    if (sourceType === 'genomic-dna') {
        // Genomic DNA -> 转录成 RNA ('dna-rna')
        targetRnaSeq = findBaseSequence(rawSeq, 'dna-rna');
    } else if (sourceType === 'pre-mrna') {
        // pre-mRNA -> 互补成 RNA ('rna-rna')
        targetRnaSeq = findBaseSequence(rawSeq, 'rna-rna');
    } else if (sourceType === 'mature-mrna') {
        // Mature mRNA -> 直接作为 mRNA 处理
        targetRnaSeq = rawSeq;
    }

    // 如果在前置碱基转录/互补过程中检测出非法字符
    if (targetRnaSeq === null) {
        resultBox.className = 'result-box error-text';
        resultBox.textContent = getText('invalidSequence');
        return;
    }

    // 执行氨基酸翻译算法
    const translationResult = translateFromAug(targetRnaSeq);

    if (translationResult === null) {
        resultBox.className = 'result-box error-text';
        resultBox.textContent = getText('noAugError'); // 查字典提示未找到起始密码子 AUG
    } else {
        resultBox.className = 'result-box success-text';
        resultBox.textContent = translationResult;
    }
}