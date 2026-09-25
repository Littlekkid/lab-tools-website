// js/main.js
import { initPairingModule } from './pairing.js';

// 假设这是你加载 HTML 模块的函数
function loadPairingModule() {
fetch('modules/pairing.html')
    .then(res => res.text())
    .then(html => {
        // 1. 把页面内容塞进主容器
        document.getElementById('app-container').innerHTML = html;
        
        // 2. 页面元素生成后，立刻绑定事件
        initPairingModule();
    })
    .catch(err => console.error('fail', err)); 
}
// 页面加载完成后自动加载 pairing 模块
document.addEventListener('DOMContentLoaded', loadPairingModule);
