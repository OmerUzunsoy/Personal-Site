// Instagram username yazı makinesi efekti
const texts = [
    "@omer_uzunsoy55",
    "Bilgisayar Programcılığı Öğrencisi",
    "Problem Çözücü",
    "Formula 1 Fanatiği",
    "Müzik Sevdalısı",
    "Ferrari Hayranı"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentText = texts[textIndex];
    const typedElement = document.getElementById('typed-text');
    
    if (isDeleting) {
        // Harf silme
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Silme hızı daha hızlı
    } else {
        // Harf yazma
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // Kelime tamamlandığında
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000; // 2 saniye bekle
        isDeleting = true;
    }
    
    // Kelime tamamen silindiğinde
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Sonraki metne geç
        typingSpeed = 500; // Yeni kelimeye başlamadan önce bekle
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Theme Toggle Function
function toggleTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Smooth transition
    document.body.style.transition = 'all 0.3s ease';
    
    html.setAttribute('data-theme', newTheme);
    
    // Icon değiştir
    if (newTheme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
    
    // LocalStorage'a kaydet
    localStorage.setItem('theme', newTheme);
    
    // Transition'ı temizle
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Project Card Click Function
function openProject(githubUrl) {
    // Smooth animation before redirect
    const clickedCard = event.currentTarget;
    
    // Click animasyonu
    clickedCard.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Yeni sekmede GitHub linkini aç
        window.open(githubUrl, '_blank');
        
        // Animasyonu geri al
        clickedCard.style.transform = '';
    }, 150);
}

// Email Toast Function
function showEmail() {
    const toast = document.getElementById('emailToast');
    toast.classList.add('show');
    
    // 4 saniye sonra kaybolur
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Memory Gallery Functions
function openMemory(imageSrc, caption) {
    const modal = document.getElementById('memoryModal');
    const modalImg = document.getElementById('memoryImage');
    const modalCaption = document.getElementById('memoryCaption');
    
    // Modal'ı göster
    modal.classList.add('show');
    modalImg.src = imageSrc;
    modalCaption.textContent = caption;
    
    // Body scroll'unu engelle
    document.body.style.overflow = 'hidden';
}

function closeMemory() {
    const modal = document.getElementById('memoryModal');
    modal.classList.remove('show');
    
    // Body scroll'unu aktif et
    document.body.style.overflow = 'auto';
}

// Sayfa yüklendiğinde animasyonu başlat
document.addEventListener('DOMContentLoaded', function() {
    // Saved theme'i yükle
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    html.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Yazı makinesi efektini başlat
    typeEffect();
    
    // Scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Hakkımda bölümündeki paragrafları gözlemle
    document.querySelectorAll('.about-content p').forEach(p => {
        observer.observe(p);
    });
    
    // Projeler bölümündeki kartları gözlemle
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Anılarım bölümündeki öğeleri gözlemle
    document.querySelectorAll('.memory-item').forEach(item => {
        observer.observe(item);
    });
    
    // Sosyal medya linklerine hover efekti
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(360deg) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });
    
    // CV butonu click efekti
    const cvButton = document.querySelector('.cv-button');
    if (cvButton) {
        cvButton.addEventListener('click', function(e) {
            // Buton animasyonu
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // CV dosyası henüz yoksa uyarı ver
            if (!document.querySelector('a[href="cv.pdf"]').href.includes('.pdf')) {
                e.preventDefault();
                alert('CV dosyası henüz yüklenmedi! GitHub\'da cv.pdf dosyasını eklemen gerekiyor.');
            }
        });
    }
    
    // Profil fotoğrafına tıklama efekti
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'profilePulse 2s ease-in-out infinite';
            }, 100);
            
            // Rastgele mesaj göster
            const messages = [
                "Merhaba! 👋",
                "Formula 1 severim! 🏎️",
                "Kod yazmayı öğreniyorum! 💻",
                "Müzik dinlemeyi severim! 🎵",
                "Bisiklet sürmek harika! 🚴‍♂️"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Geçici mesaj göster
            const messageDiv = document.createElement('div');
            messageDiv.textContent = randomMessage;
            messageDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(120, 119, 198, 0.9);
                color: white;
                padding: 20px;
                border-radius: 10px;
                font-size: 1.2em;
                z-index: 1000;
                animation: fadeInOut 2s ease;
            `;
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 2000);
        });
    }
    
    // Modal event listeners
    const memoryModal = document.getElementById('memoryModal');
    if (memoryModal) {
        // Modal dışına tıklayınca kapansın
        memoryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeMemory();
            }
        });
    }
});

// Fadeın-out animasyonu için CSS ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
`;
document.head.appendChild(style);

// Smooth scroll efekti
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + D ile dark/light mode toggle
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
    
    // ESC tuşu ile modal kapansın
    if (e.key === 'Escape') {
        const modal = document.getElementById('memoryModal');
        if (modal && modal.classList.contains('show')) {
            closeMemory();
        }
    }
});

// Smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Project cards hover effect enhancement
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Diğer kartları hafif soluklaştır
            projectCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Tüm kartları normale döndür
            projectCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = '';
            });
        });
    });
});
