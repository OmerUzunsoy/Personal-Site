// Language translations
const translations = {
    tr: {
        typing: [
            "@omer_uzunsoy55",
            "Bilgisayar Programcılığı Öğrencisi",
            "Problem Çözücü",
            "Formula 1 Fanatiği",
            "Müzik Sevdalısı",
            "Ferrari Hayranı"
        ],
        "about.title": "Hakkımda",
        "about.paragraph1": "Merhaba! Ben Ömer, Işık Üniversitesi Bilgisayar Programcılığı 1. sınıf öğrencisiyim. Kod yazmaya yakın zamanda başladım ve her gün yeni şeyler öğrenmeye devam ediyorum.",
        "about.paragraph2": "Müzik dinlemeyi, oyun oynamayı ve Formula 1 yarışlarını takip etmeyi seviyorum. Ayrıca bisiklet sürmek ve voleybol oynamak en büyük hobilerimin başında geliyor.",
        "about.paragraph3": "Hedefim insanların hayatını kolaylaştıracak, işlerine yarayacak uygulamalar geliştirmek. Dürüstlük ve saygı benim için çok önemli değerler. Aklıma bir şey takıldığında onu çözene kadar duramam - biraz inatçıyım bu konuda! 😄",
        "projects.title": "Projelerim",
        "projects.subtitle": "Geliştirdiğim projeler ve GitHub repositories",
        "projects.uzunsclicker.description": "Windows için geliştirilmiş otomatik tıklama uygulaması. Kullanıcı dostu arayüz ile kolay kurulum ve hızlı tıklama özellikleri sunar.",
        "projects.uzunsclicker.date": "25 Mayıs 2025",
        "projects.uzunsclicker_v2.description": "Modern Mouse Auto Clicker - Windows Desktop Application. Gelişmiş özellikler, modern arayüz ve geliştirilmiş performans sunar.",
        "projects.uzunsclicker_v2.date": "10 Ağustos 2025",
        "projects.viewOnGithub": "GitHub'da Görüntüle",
        "cv.download": "CV İndir",
        "memories.title": "Anılarım",
        "memories.subtitle": "Hayatımdan özel anlar",
        "loading": "Yükleniyor..."
    },
    en: {
        typing: [
            "@omer_uzunsoy55",
            "Computer Programming Student",
            "Problem Solver",
            "Formula 1 Fanatic",
            "Music Lover",
            "Ferrari Fan"
        ],
        "about.title": "About Me",
        "about.paragraph1": "Hello! I'm Ömer, a 1st year Computer Programming student at Işık University. I recently started coding and continue to learn new things every day.",
        "about.paragraph2": "I love listening to music, playing games, and following Formula 1 races. Cycling and playing volleyball are among my biggest hobbies.",
        "about.paragraph3": "My goal is to develop applications that will make people's lives easier and be useful to them. Honesty and respect are very important values for me. When something gets stuck in my mind, I can't stop until I solve it - I'm a bit stubborn about this! 😄",
        "projects.title": "My Projects",
        "projects.subtitle": "Projects I've developed and GitHub repositories",
        "projects.uzunsclicker.description": "Auto-click application developed for Windows. Offers user-friendly interface with easy installation and fast clicking features.",
        "projects.uzunsclicker.date": "May 25, 2025",
        "projects.uzunsclicker_v2.description": "Modern Mouse Auto Clicker - Windows Desktop Application. Offers advanced features, modern interface and improved performance.",
        "projects.uzunsclicker_v2.date": "August 10, 2025",
        "projects.viewOnGithub": "View on GitHub",
        "cv.download": "Download CV",
        "memories.title": "My Memories",
        "memories.subtitle": "Special moments from my life",
        "loading": "Loading..."
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'tr';

// Instagram username yazı makinesi efekti
let texts = translations[currentLanguage].typing;
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

// Language Toggle Function
function toggleLanguage() {
    const languageBtn = document.getElementById('languageToggle');
    const flagIcon = document.getElementById('currentFlag');
    const langText = document.getElementById('currentLang');
    const flagTr = flagIcon.querySelector('.flag-tr');
    const flagUs = flagIcon.querySelector('.flag-us');
    
    // Smooth transition
    languageBtn.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
        
        // Update flag and text
        if (currentLanguage === 'en') {
            flagTr.style.display = 'none';
            flagUs.style.display = 'block';
            langText.textContent = 'EN';
        } else {
            flagTr.style.display = 'block';
            flagUs.style.display = 'none';
            langText.textContent = 'TR';
        }
        
        // Update page language
        document.documentElement.lang = currentLanguage;
        
        // Update all text content
        updateLanguage();
        
        // Update typing animation texts
        texts = translations[currentLanguage].typing;
        
        // Save to localStorage
        localStorage.setItem('language', currentLanguage);
        
        languageBtn.style.transform = 'scale(1)';
    }, 150);
}

// Update Language Function
function updateLanguage() {
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLanguage][key]) {
            // Staggered animation for text updates
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                element.textContent = translations[currentLanguage][key];
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'all 0.3s ease';
            }, Math.random() * 200);
        }
    });
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
    // Hide loading overlay after page load
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Simulate loading time and fade out loading overlay
    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }, 1500); // 1.5 second loading time
    
    // Load saved language
    const savedLanguage = localStorage.getItem('language') || 'tr';
    const languageToggle = document.getElementById('languageToggle');
    const flagIcon = document.getElementById('currentFlag');
    const langText = document.getElementById('currentLang');
    const flagTr = flagIcon.querySelector('.flag-tr');
    const flagUs = flagIcon.querySelector('.flag-us');
    
    // Set language
    currentLanguage = savedLanguage;
    document.documentElement.lang = currentLanguage;
    
    if (currentLanguage === 'en') {
        flagTr.style.display = 'none';
        flagUs.style.display = 'block';
        langText.textContent = 'EN';
    } else {
        flagTr.style.display = 'block';
        flagUs.style.display = 'none';
        langText.textContent = 'TR';
    }
    
    // Update typing texts for current language
    texts = translations[currentLanguage].typing;
    
    // Update all language-dependent content
    updateLanguage();
    
    // Language toggle event listener
    languageToggle.addEventListener('click', toggleLanguage);
    
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
    
    // Enhanced scroll animasyonları with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, index * 100); // 100ms delay between each element
            }
        });
    }, observerOptions);
    
    // Hakkımda bölümündeki paragrafları gözlemle
    document.querySelectorAll('.about-content p').forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(30px)';
        p.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(p);
    });
    
    // Projeler bölümündeki kartları gözlemle
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });
    
    // Anılarım bölümündeki öğeleri gözlemle
    document.querySelectorAll('.memory-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) rotateX(20deg)';
        item.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(item);
    });
    
    // Enhanced sosyal medya linklerine hover efekti
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(360deg) scale(1.1)';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(120, 119, 198, 0.4))';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            this.style.filter = 'none';
        });
    });
    
    // Enhanced CV butonu click efekti
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
    
    // Enhanced profil fotoğrafına tıklama efekti
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'profilePulse 2s ease-in-out infinite';
            }, 100);
            
            // Rastgele mesaj göster (dil bazlı)
            const messages = currentLanguage === 'tr' ? [
                "Merhaba! 👋",
                "Formula 1 severim! 🏎️",
                "Kod yazmayı öğreniyorum! 💻",
                "Müzik dinlemeyi severim! 🎵",
                "Bisiklet sürmek harika! 🚴‍♂️"
            ] : [
                "Hello! 👋",
                "I love Formula 1! 🏎️",
                "Learning to code! 💻",
                "I love listening to music! 🎵",
                "Cycling is awesome! 🚴‍♂️"
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
                animation: messagePopup 2s ease;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 30px rgba(120, 119, 198, 0.3);
            `;
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                if (document.body.contains(messageDiv)) {
                    document.body.removeChild(messageDiv);
                }
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
    
    // Initialize micro-interactions
    addMicroInteractions();
    
    // Enhanced project card hover effects with multiple cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Subtle dim effect for other cards
            projectCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.filter = 'brightness(0.7) blur(1px)';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            projectCards.forEach(otherCard => {
                otherCard.style.filter = 'none';
                otherCard.style.transform = 'scale(1)';
            });
        });
    });
});

// Fadeın-out animasyonu için CSS ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
    
    @keyframes messagePopup {
        0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.3) rotateY(90deg); 
        }
        50% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.1) rotateY(0deg); 
        }
        70% { 
            transform: translate(-50%, -50%) scale(1) rotateY(0deg); 
        }
        100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.3) rotateY(-90deg); 
        }
    }
    
    .animate-in {
        animation: bounceIn 0.6s ease;
    }
    
    @keyframes bounceIn {
        0% {
            transform: translateY(30px) scale(0.9);
            opacity: 0;
        }
        50% {
            transform: translateY(-10px) scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
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
    
    // Ctrl + L ile language toggle
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        toggleLanguage();
    }
    
    // ESC tuşu ile modal kapansın
    if (e.key === 'Escape') {
        const modal = document.getElementById('memoryModal');
        if (modal && modal.classList.contains('show')) {
            closeMemory();
        }
    }
});

// Smooth scrolling for better UX - Remove excessive parallax
document.documentElement.style.scrollBehavior = 'smooth';

// Reduced parallax scroll effect for better readability
let ticking = false;

function updateParallax() {
    const scrollTop = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrollTop < heroHeight) {
        const scrollPercent = scrollTop / heroHeight;
        
        // Reduced parallax effect for hero background - less intrusive
        hero.style.transform = `translateY(${scrollTop * 0.2}px)`;
        
        // Very subtle parallax effect for hero content
        const profileContainer = document.querySelector('.profile-container');
        profileContainer.style.transform = `translateY(${scrollTop * 0.1}px)`;
        
        // Less aggressive fade effect
        const opacity = 1 - (scrollPercent * 0.4);
        profileContainer.style.opacity = Math.max(opacity, 0.6);
    }
    
    ticking = false;
}

function requestParallaxUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

// Scroll listener for parallax
window.addEventListener('scroll', requestParallaxUpdate);

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

// Combined scroll listener for better performance
window.addEventListener('scroll', function() {
    requestParallaxUpdate();
    updateScrollProgress();
}, { passive: true });

// Micro-interactions: Add subtle animations on hover
function addMicroInteractions() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('button, .cv-button, .project-card');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Enhanced tech tag animations
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(120, 119, 198, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Performance optimization: Intersection Observer for memory items
const memoryObserverOptions = {
    threshold: 0.05,
    rootMargin: '50px'
};

const memoryObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        const img = entry.target.querySelector('img');
        if (entry.isIntersecting && img && !img.dataset.loaded) {
            // Lazy load images for better performance
            img.style.opacity = '0';
            img.onload = function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            };
            img.dataset.loaded = 'true';
        }
    });
}, memoryObserverOptions);

// Apply memory observer
document.querySelectorAll('.memory-item').forEach(item => {
    memoryObserver.observe(item);
});
