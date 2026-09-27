// js/calculator.js
import { calculateSolidMass } from './calculator_formula.js';

export function initCalculatorModule() {
    const btnCalculate = document.getElementById('btn-calculate');
    const mwInput = document.getElementById('mw-input');
    const concInput = document.getElementById('conc-input');
    const volInput = document.getElementById('vol-input');
    const resultMg = document.getElementById('calc-result-mg');
    const resultG = document.getElementById('calc-result-g');

    if (!btnCalculate) return;

    btnCalculate.addEventListener('click', () => {
        const mw = parseFloat(mwInput.value);
        const conc = parseFloat(concInput.value);
        const vol = parseFloat(volInput.value);

        // 校验输入合法性
        if (isNaN(mw) || isNaN(conc) || isNaN(vol) || mw <= 0 || conc <= 0 || vol <= 0) {
            resultMg.textContent = '--- mg';
            resultG.textContent = '--- g';
            return;
        }

        // 调用公式计算
        const { massMg, massG } = calculateSolidMass(conc, vol, mw);

        // 渲染结果（保留4位小数）
        resultMg.textContent = `${massMg.toFixed(4)} mg`;
        resultG.textContent = `${massG.toFixed(4)} g`;
    });
}