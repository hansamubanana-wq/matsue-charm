// ページ読み込み完了時の処理
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.style.opacity = 0;
    setTimeout(() => {
        loading.style.display = 'none';
    }, 1000);
});

// スクロールアニメーション
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature, .map-section').forEach(section => {
    observer.observe(section);
});

// ▼ ここから下が新機能（マウスストーカー）
const cursor = document.getElementById('cursor');
const stalker = document.getElementById('stalker');

// マウスが動いた時の処理
document.addEventListener('mousemove', function(e) {
    // カーソル（中心の点）はマウス座標に即座に移動
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    
    // ストーカー（外側の輪）は少し遅れてついてくる
    setTimeout(function() {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    }, 100);
});

// リンクに乗った時に少し大きくする演出
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        stalker.style.transform += ' scale(1.5)';
        stalker.style.borderColor = '#c5a059'; // 色を金色に
    });
    link.addEventListener('mouseleave', () => {
        stalker.style.transform = stalker.style.transform.replace(' scale(1.5)', '');
        stalker.style.borderColor = 'rgba(255, 255, 255, 0.5)'; // 元に戻す
    });
});