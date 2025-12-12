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

// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.global-nav');
const navLinks = document.querySelectorAll('.global-nav a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// スクロールインジケーター & トップへ戻る
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollCurrent = document.documentElement.scrollTop;
    
    const scrollPercent = (scrollCurrent / scrollTotal) * 100;
    progressBar.style.width = scrollPercent + '%';

    if (scrollCurrent > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ▼▼▼ 今回の追加機能 ▼▼▼

// 1. ライトボックス（画像拡大）
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');
const featureImgs = document.querySelectorAll('.feature-img');

// 画像をクリックした時の処理
featureImgs.forEach(img => {
    img.addEventListener('click', () => {
        // 背景画像のURLを取得して、拡大用画像のsrcにセット
        const style = window.getComputedStyle(img);
        const bgImage = style.backgroundImage;
        // url("...") の形からURLだけ抜き出す
        const url = bgImage.slice(5, -2);
        
        lightboxImg.src = url;
        lightbox.classList.add('active');
    });
});

// 閉じるボタンか背景をクリックしたら閉じる
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});


// 2. 言語切り替え（JP / EN）
const langSwitch = document.getElementById('lang-switch');
const body = document.body;

langSwitch.addEventListener('click', () => {
    body.classList.toggle('en-mode');
    
    // ボタンの文字を変える
    if (body.classList.contains('en-mode')) {
        langSwitch.textContent = 'JP';
    } else {
        langSwitch.textContent = 'EN';
    }
});