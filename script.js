// Instagram username yazı makinesi efekti
const texts = [
    "@omer_uzunsoy55",
    "Bilgisayar Programcılığı Öğrencisi",
    "Problem Çözücü",
    "Formula 1 Fanatiği",
    "Müzik Sevdalısı",
    "Ferrai Hayranı"
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

// Email Toast Function - Senin Stilinde
function showEmail() {
    const toast = document.getElementById('emailToast');
    toast.classList.add('show');
    
    // 4 saniye sonra kaybolur
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Memory Gallery Functions - Ultra Smooth
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
    // Ctrl + D ile dark mode toggle (gelecekte eklenecek)
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        console.log('Dark mode toggle - henüz aktif değil!');
    }
    
    // ESC tuşu ile modal kapansın
    if (e.key === 'Escape') {
        const modal = document.getElementById('memoryModal');
        if (modal && modal.classList.contains('show')) {
            closeMemory();
        } else {
            // ESC ile tüm animasyonları durdur/başlat
            const allAnimatedElements = document.querySelectorAll('*');
            allAnimatedElements.forEach(el => {
                if (el.style.animationPlayState === 'paused') {
                    el.style.animationPlayState = 'running';
                } else {
                    el.style.animationPlayState = 'paused';
                }
            });
        }
    }
});
