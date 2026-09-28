// @ts-check
import { calculateSolidMass, calculateDilution } from './calculator_formula.js';

/**
 * 1. 处理固体质量计算的 UI 逻辑
 */
function handleSolidMassCalculation() {
    const mwInput = /** @type {HTMLInputElement} */ (document.getElementById('mw-input'));
    const concInput = /** @type {HTMLInputElement} */ (document.getElementById('conc-input'));
    const volInput = /** @type {HTMLInputElement} */ (document.getElementById('vol-input'));
    const resultMg = document.getElementById('calc-result-mg');
    const resultG = document.getElementById('calc-result-g');

    if (!mwInput || !concInput || !volInput || !resultMg || !resultG) return;

    const mw = parseFloat(mwInput.value);
    const conc = parseFloat(concInput.value);
    const vol = parseFloat(volInput.value);

    if (isNaN(mw) || isNaN(conc) || isNaN(vol) || mw <= 0 || conc <= 0 || vol <= 0) {
        resultMg.textContent = '--- mg';
        resultG.textContent = '--- g';
        return;
    }

    const { massMg, massG } = calculateSolidMass(conc, vol, mw);
    resultMg.textContent = `${massMg.toFixed(4)} mg`;
    resultG.textContent = `${massG.toFixed(4)} g`;
}

/**
 * 2. 处理母液稀释计算的 UI 逻辑
 */
function handleDilutionCalculation() {
    const c1Input = /** @type {HTMLInputElement} */ (document.getElementById('c1-input'));
    const c2Input = /** @type {HTMLInputElement} */ (document.getElementById('c2-input'));
    const v2Input = /** @type {HTMLInputElement} */ (document.getElementById('v2-input'));
    const resultV1 = document.getElementById('dil-result-v1');
    const resultSolvent = document.getElementById('dil-result-solvent');

    if (!c1Input || !c2Input || !v2Input || !resultV1 || !resultSolvent) return;

    const c1 = parseFloat(c1Input.value);
    const c2 = parseFloat(c2Input.value);
    const v2 = parseFloat(v2Input.value);

    if (isNaN(c1) || isNaN(c2) || isNaN(v2) || c1 <= 0 || c2 <= 0 || v2 <= 0 || c2 > c1) {
        resultV1.textContent = ' --- ';
        resultSolvent.textContent = ' --- ';
        return;
    }

    const { v1, vSolvent } = calculateDilution(c1, c2, v2);
    resultV1.textContent = ` ${v1.toFixed(4)} `;
    resultSolvent.textContent = ` ${vSolvent.toFixed(4)} `;
}

/**
 * 3. 模块入口：仅负责事件绑定
 */
export function initCalculatorModule() {
    const btnCalculateSolid = document.getElementById('btn-calculate');
    const btnCalculateDilution = document.getElementById('btn-calculate-dilution');

    if (btnCalculateSolid) {
        btnCalculateSolid.addEventListener('click', handleSolidMassCalculation);
    }

    if (btnCalculateDilution) {
        btnCalculateDilution.addEventListener('click', handleDilutionCalculation);
    }
}