function translateFromAug(rnaSequence) {
    // 1. 定位第一个 AUG 的位置
    let startIndex = rnaSequence.indexOf('AUG');
    
    if (startIndex === -1) {
        return "未找到起始密码子 (AUG)";
    }

    let aminoAcids = [];

    // 2. 从 startIndex 开始，每次跳 3 个碱基
    for (let i = startIndex; i <= rnaSequence.length - 3; i += 3) {
        let codon = rnaSequence.slice(i, i + 3);
        let aa = codonTable[codon] || '?';

        if (aa === 'Stop') {
            aminoAcids.push('Stop');
            break; // 遇到 Stop 立即结束循环
        }

        aminoAcids.push(aa);
    }

    return aminoAcids.join('-');
}