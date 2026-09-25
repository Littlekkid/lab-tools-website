import { dnaToDnaPairs, dnaToRnaPairs, rnaToRnaPairs } from './table.js';

/**
 * 根据输入序列和配对模式计算互补链
 * @param {string} sequence 碱基序列 (大写)
 * @param {string} mode 配对模式 ('dna-dna', 'dna-rna', 'rna-rna')
 * @returns {string|null} 配对并反转后的序列；若有非法碱基或模式不匹配则返回 null
 */
export function findBaseSequence(sequence, mode) {
    let pairTable;
    if (mode === 'dna-dna') {
        pairTable = dnaToDnaPairs;
    } else if (mode === 'dna-rna') {
        pairTable = dnaToRnaPairs;
    } else if (mode === 'rna-rna') {
        pairTable = rnaToRnaPairs;
    } else {
        return null;
    }

    let pairedArray = [];
    for (let i = 0; i < sequence.length; i++) {
        const char = sequence[i];
        const matched = pairTable[char];

        if (matched) {
            pairedArray.push(matched);
        } else {
            // 包含非法字符，算法层直接返回 null
            return null;
        }
    }

    // 将互补链反转 (5' 到 3' 方向) 并拼接
    return pairedArray.reverse().join('');
}