// 模式 1：DNA 互补 (DNA -> DNA)
const dnaToDnaPairs = {
    'A': 'T', 'T': 'A',
    'C': 'G', 'G': 'C'
};

// 模式 2：DNA 转录 (DNA -> RNA)
const dnaToRnaPairs = {
    'A': 'U', 'T': 'A',
    'C': 'G', 'G': 'C'
};

// 模式 3：RNA 互补 (RNA -> RNA)
const rnaToRnaPairs = {
    'A': 'U', 'U': 'A',
    'C': 'G', 'G': 'C'
};

// 密码子翻译字典 (mRNA 5' -> 3' 密码子对应 20 种天然氨基酸及终止信号)
const codonTable = {
    // 苯丙氨酸 (Phe) & 亮氨酸 (Leu)
    'UUU': 'Phe', 'UUC': 'Phe',
    'UUA': 'Leu', 'UUG': 'Leu',
    'CUU': 'Leu', 'CUC': 'Leu', 'CUA': 'Leu', 'CUG': 'Leu',

    // 异亮氨酸 (Ile) & 甲硫氨酸/起始密码子 (Met)
    'AUU': 'Ile', 'AUC': 'Ile', 'AUA': 'Ile',
    'AUG': 'Met',

    // 缬氨酸 (Val)
    'GUU': 'Val', 'GUC': 'Val', 'GUA': 'Val', 'GUG': 'Val',

    // 丝氨酸 (Ser)
    'UCU': 'Ser', 'UCC': 'Ser', 'UCA': 'Ser', 'UCG': 'Ser',

    // 脯氨酸 (Pro)
    'CCU': 'Pro', 'CCC': 'Pro', 'CCA': 'Pro', 'CCG': 'Pro',

    // 苏氨酸 (Thr)
    'ACU': 'Thr', 'ACC': 'Thr', 'ACA': 'Thr', 'ACG': 'Thr',

    // 丙氨酸 (Ala)
    'GCU': 'Ala', 'GCC': 'Ala', 'GCA': 'Ala', 'GCG': 'Ala',

    // 酪氨酸 (Tyr) & 终止密码子 (Stop)
    'UAU': 'Tyr', 'UAC': 'Tyr',
    'UAA': 'Stop', 'UAG': 'Stop',

    // 半胱氨酸 (Cys) & 终止密码子 (Stop) & 色氨酸 (Trp)
    'UGU': 'Cys', 'UGC': 'Cys',
    'UGA': 'Stop',
    'UGG': 'Trp',

    // 组氨酸 (His) & 谷氨酰胺 (Gln)
    'CAU': 'His', 'CAC': 'His',
    'CAA': 'Gln', 'CAG': 'Gln',

    // 精氨酸 (Arg)
    'CGU': 'Arg', 'CGC': 'Arg', 'CGA': 'Arg', 'CGG': 'Arg',

    // 丝氨酸 (Ser) & 精氨酸 (Arg)
    'AGU': 'Ser', 'AGC': 'Ser',
    'AGA': 'Arg', 'AGG': 'Arg',

    // 天冬酰胺 (Asn) & 赖氨酸 (Lys)
    'AAU': 'Asn', 'AAC': 'Asn',
    'AAA': 'Lys', 'AAG': 'Lys',

    // 天冬氨酸 (Asp) & 谷氨酸 (Glu)
    'GAU': 'Asp', 'GAC': 'Asp',
    'GAA': 'Glu', 'GAG': 'Glu',

    // 甘氨酸 (Gly)
    'GGU': 'Gly', 'GGC': 'Gly', 'GGA': 'Gly', 'GGG': 'Gly'
};

export { codonTable,  dnaToDnaPairs , dnaToRnaPairs, rnaToRnaPairs };