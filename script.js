// ページ読み込み完了時の処理
window.addEventListener('load', () => {
    // ローディング画面を消す
    const loading = document.getElementById('loading');
    loading.style.opacity = 0;
    setTimeout(() => {
        loading.style.display = 'none';
    }, 1000);
});

// スクロールアニメーションの設定
const observerOptions = {
    root: null, // ビューポートを基準
    rootMargin: '0px',
    threshold: 0.2 // 要素が20%見えたら発火
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // 一度表示したら監視を終了
        }
    });
}, observerOptions);

// 監視対象（.featureクラスがついた要素）を登録
document.querySelectorAll('.feature').forEach(section => {
    observer.observe(section);
});