// js/main.js
import { initPairingModule } from './pairing.js';
import { setLanguage, updatePageLanguage } from './i18n.js';

function loadModule(moduleName) {
    // 1. 根据传入的名称，动态拼接文件名（比如 'modules/pairing.html' 或 'modules/unit.html'）
    fetch(`modules/${moduleName}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('app-container').innerHTML = html;
            
            // 2. 根据加载的是哪一个模块，去启动对应模块的 JS
            if (moduleName === 'pairing') {
                initPairingModule();
            } else if (moduleName === 'unit') {
                // 未来在这里启动 initUnitModule();
            }
            
            // 3. 统一刷新当前模块的语言
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

// 初始化选项卡切换监听
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 移除所有 Tab 的高亮样式
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 给当前点击的 Tab 加上高亮
            e.currentTarget.classList.add('active');
            
            // 读取 data-tab 属性值（'pairing' 或 'unit'）并加载对应模块
            const targetModule = e.currentTarget.getAttribute('data-tab');
            loadModule(targetModule);
        });
    });
}
// 页面加载完成后自动加载模块与绑定监听
document.addEventListener('DOMContentLoaded', () => {
    initLanguageSelector();
    initTabNavigation();
    loadModule('pairing');
});