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