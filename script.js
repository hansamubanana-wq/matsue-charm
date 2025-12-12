window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('loaded');
    }, 500);
    setTimeout(() => {
        loading.style.display = 'none';
    }, 2500);
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.color = 'rgba(197, 160, 89, ' + (Math.random() * 0.5 + 0.1) + ')';
    }
    update() {
        this.y -= this.speedY;
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
function initParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}
initParticles();
function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

const splitTexts = document.querySelectorAll('.split-text .ja');
splitTexts.forEach(textBlock => {
    const chars = textBlock.querySelectorAll('span');
    chars.forEach((char, index) => {
        char.style.transitionDelay = `${index * 0.05}s`;
    });
});

// ▼▼▼ 【追加】3D Tilt Effect の処理 ▼▼▼
const tiltImages = document.querySelectorAll('.feature-img');
tiltImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
        // 画像の中心からのマウス位置を計算
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // 中心を0とした座標に変換
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = x - centerX;
        const deltaY = y - centerY;
        // 傾きの角度を計算（数字を変えると傾き具合が変わる）
        const rotateX = (deltaY / centerY) * -10; // 上下
        const rotateY = (deltaX / centerX) * 10;  // 左右

        // スタイルを適用（少し拡大して浮き上がらせる）
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        img.style.transition = 'transform 0.1s'; // 滑らかに追従
    });

    // マウスが外れたら元に戻す
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        img.style.transition = 'transform 0.5s ease-out'; // ふわっと戻る
    });
});


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
        let url = bgImage.replace('url("', '').replace('")', '');
        url = url.replace(/ixlib=.*$/, ''); 
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