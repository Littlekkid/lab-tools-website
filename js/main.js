// js/main.js
import { initPairingModule } from './pairing.js';
import { setLanguage, updatePageLanguage } from './i18n.js';

function loadPairingModule() {
    fetch('modules/pairing.html')
        .then(res => res.text())
        .then(html => {
            // 1. 把页面内容塞进主容器
            document.getElementById('app-container').innerHTML = html;
            
            // 2. 页面元素生成后，立刻绑定事件
            initPairingModule();

            // 3. 模块 HTML 渲染完成后，刷一次语言（确保刚刚载入的 pairing 模块也应用语言）
            updatePageLanguage();
        })
        .catch(err => console.error('fail', err));
}

// 初始化语言监听器
function initLanguageSelector() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value; // 'en' 或 'de'
            setLanguage(selectedLang);          // 更新 i18n 里的全局语言状态
            updatePageLanguage();               // 重新扫描全页 DOM 刷新文本
        });
    }
}

// 页面加载完成后自动加载模块与绑定监听
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    loadPairingModule();
});