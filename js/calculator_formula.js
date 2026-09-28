// js/calculator_formula.js

/**
 * 计算所需的固体质量
 * @param {number} concMM - 浓度 (mM)
 * @param {number} volML - 体积 (mL)
 * @param {number} mw - 摩尔质量 (g/mol)
 * @returns {{ massMg: number, massG: number }} 返回包含 mg 和 g 的对象
 */
export function calculateSolidMass(concMM, volML, mw) {
    if (concMM <= 0 || volML <= 0 || mw <= 0) {
        return { massMg: 0, massG: 0 };
    }

    // 数值直接相乘即可得到 mg
    const massMg = concMM * volML * mw;
    const massG = massMg / 1000;

    return { massMg, massG };
}

// @ts-check

/**
 * 计算母液稀释体积
 * @param {number} c1 母液浓度
 * @param {number} c2 目标浓度
 * @param {number} v2 目标体积
 * @returns {{ v1: number, vSolvent: number }}
 */
export function calculateDilution(c1, c2, v2) {
    if (c1 <= 0 || c2 <= 0 || v2 <= 0 || c2 > c1) {
        return { v1: 0, vSolvent: 0 };
    }
    const v1 = (c2 * v2) / c1;
    const vSolvent = v2 - v1;
    return { v1, vSolvent };
}

// @ts-check

/**
 * 根据 RPM 和半径 r 计算相对离心力 RCF (× g)
 * @param {number} rpm 转速 (RPM)
 * @param {number} r 转头半径 (cm)
 * @returns {number} 离心力 (× g)
 */
export function calculateRcfFromRpm(rpm, r) {
    if (rpm <= 0 || r <= 0) {
        return 0;
    }
    return 1.118e-5 * r * Math.pow(rpm, 2);
}

/**
 * 根据 RCF (g) 和半径 r 计算转速 RPM
 * @param {number} rcf 相对离心力 (× g)
 * @param {number} r 转头半径 (cm)
 * @returns {number} 转速 (RPM)
 */
export function calculateRpmFromRcf(rcf, r) {
    if (rcf <= 0 || r <= 0) {
        return 0;
    }
    return Math.sqrt(rcf / (1.118e-5 * r));
}

// @ts-check

/**
 * 对应核酸类型的 A260 换算系数 (µg/mL per A260)
 * @type {Record<string, number>}
 */
const NUCLEIC_ACID_FACTORS = {
    dsdna: 50,  // 双链 DNA
    ssdna: 33,  // 单链 DNA / 寡核苷酸
    rna: 40     // RNA
};

/**
 * 根据 A260 吸光度计算核酸浓度 (µg/mL 或 ng/µL)
 * @param {number} a260 吸光度读数
 * @param {string} sampleType 样品类型 ('dsdna' | 'ssdna' | 'rna')
 * @param {number} [dilutionFactor=1] 稀释倍数 (默认为 1)
 * @returns {number} 浓度值 (ng/µL 或 µg/mL)
 */
export function calculateQuantification(a260, sampleType, dilutionFactor = 1) {
    if (a260 <= 0 || dilutionFactor <= 0) {
        return 0;
    }

    // 获取对应的换算系数，若找不到默认按 dsDNA (50) 处理
    const factor = NUCLEIC_ACID_FACTORS[sampleType] || 50;

    // 计算结果：A260 * 系数 * 稀释倍数
    return a260 * factor * dilutionFactor;
}