window.addEventListener('load', () => {
    // 幕が開くアニメーション開始
    const loading = document.getElementById('loading');
    // 少し待ってから開く
    setTimeout(() => {
        loading.classList.add('loaded');
    }, 500);

    // 開ききったらloading要素自体を非表示（裏で邪魔しないように）
    setTimeout(() => {
        loading.style.display = 'none';
    }, 2500);
});

// ▼▼▼ 背景の粒子アニメーション（今回の目玉！） ▼▼▼
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// 画面サイズに合わせてキャンバスの大きさを設定
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// 粒子の設計図
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5; // 粒の大きさ
        this.speedY = Math.random() * 0.5 + 0.2; // 上に登るスピード
        this.color = 'rgba(197, 160, 89, ' + (Math.random() * 0.5 + 0.1) + ')'; // 金色（半透明）
    }

    update() {
        this.y -= this.speedY; // 上へ移動
        // 画面の上に行ったら下に戻る
        if (this.y < 0) {
            this.y = height;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 粒子を100個作る
function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// アニメーションループ
function animate() {
    ctx.clearRect(0, 0, width, height); // 画面をクリア
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();


// ▼▼▼ 以下、既存の機能 ▼▼▼

const observerOptions = {
    root: null, rootMargin: '0px', threshold: 0.2
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

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const featureImgs = document.querySelectorAll('.feature-img');
featureImgs.forEach(img => {
    img.addEventListener('click', () => {
        const style = window.getComputedStyle(img);
        const bgImage = style.backgroundImage;
        const url = bgImage.slice(5, -2);
        lightboxImg.src = url;
        lightbox.classList.add('active');
    });
});
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});

const langSwitch = document.getElementById('lang-switch');
const body = document.body;
langSwitch.addEventListener('click', () => {
    body.classList.toggle('en-mode');
    if (body.classList.contains('en-mode')) {
        langSwitch.textContent = 'JP';
    } else {
        langSwitch.textContent = 'EN';
    }
});