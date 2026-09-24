// js/main.js
import { initPairingModule } from './pairing.js';

// 假设这是你加载 HTML 模块的函数
function loadModule() {
    fetch('modules/pairing.html')
        .then(response => response.text())
        .then(html => {
            // 1. 把 HTML 片段塞进主页面的容器里
            document.getElementById('app-container').innerHTML = html;
            
            // 2. HTML 渲染完成后，立即绑定 pairing.js 的事件
            initPairingModule();
        });
}