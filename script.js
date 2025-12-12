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

// マウスストーカー
const cursor = document.getElementById('cursor');
const stalker = document.getElementById('stalker');
document.addEventListener('mousemove', function(e) {
    cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    setTimeout(function() {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    }, 100);
});

const links = document.querySelectorAll('a, .hamburger'); // ハンバーガーにも反応させる
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        stalker.style.transform += ' scale(1.5)';
        stalker.style.borderColor = '#c5a059';
    });
    link.addEventListener('mouseleave', () => {
        stalker.style.transform = stalker.style.transform.replace(' scale(1.5)', '');
        stalker.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
});

// ▼▼▼ 今回の新機能 ▼▼▼

// 1. ハンバーガーメニューの開閉
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.global-nav');
const navLinks = document.querySelectorAll('.global-nav a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// メニューのリンクを押したら、メニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// 2. スクロールインジケーター & トップへ戻るボタン
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // スクロール量の計算
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollCurrent = document.documentElement.scrollTop;
    
    // パーセント計算
    const scrollPercent = (scrollCurrent / scrollTotal) * 100;
    progressBar.style.width = scrollPercent + '%';

    // トップへ戻るボタンの表示/非表示
    if (scrollCurrent > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});