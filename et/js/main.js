// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.package-card, .feature-card').forEach((el) => observer.observe(el));

// FAQ işlevselliği


// Adım açılır-kapanır işlevselliği
document.addEventListener('DOMContentLoaded', () => {
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach(item => {
        const header = item.querySelector('.step-header');
        const content = item.querySelector('.step-content');
        
        // Başlangıçta içeriği gizle
        if (!item.classList.contains('active')) {
            content.style.display = 'none';
        }
        
        header.addEventListener('click', () => {
            // Tıklanan adımın durumunu değiştir
            item.classList.toggle('active');
            
            // İçeriği göster/gizle
            if (item.classList.contains('active')) {
                content.style.display = 'block';
                setTimeout(() => {
                    content.style.opacity = '1';
                }, 10);
            } else {
                content.style.opacity = '0';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Adım kartlarının açılıp kapanma işlevselliği
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.step-card');
        card.classList.toggle('expanded');
    });
});

// Bildirimleri belirli aralıklarla yeniden animasyonla göster
function resetNotificationAnimations() {
    const notifications = document.querySelectorAll('.notification-card');
    notifications.forEach((notification, index) => {
        notification.style.animation = 'none';
        notification.offsetHeight; // Reflow
        notification.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s forwards`;
    });
}

// Her 15 saniyede bir animasyonları tekrarla
setInterval(resetNotificationAnimations, 15000);

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    // Görünüm alanına giren elementleri izle
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Bir kez çalıştıktan sonra izlemeyi bırak
            }
        });
    }, {
        threshold: 0.1 // Elementin %10'u göründüğünde tetikle
    });

    // Animasyon yapılacak elementleri seç ve observer'a ekle
    const animatedElements = document.querySelectorAll('.step-card, .notification-card, .steps-section h2');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused'; // Başlangıçta animasyonları durdur
        observer.observe(el);
    });
});

// Adımlar için işlevsellik
document.addEventListener('DOMContentLoaded', () => {
    const stepCards = document.querySelectorAll('.step-card');
    
    // İlk adımı açık olarak başlat
    if (stepCards.length > 0) {
        stepCards[0].classList.add('active');
    }
    
    stepCards.forEach(card => {
        const header = card.querySelector('.step-header');
        
        header.addEventListener('click', () => {
            // Diğer tüm kartları kapat
            stepCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Tıklanan kartı aç/kapat
            card.classList.toggle('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.stat-card');
    
    // Kartlara giriş animasyonu ekle
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}); 


document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
  
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  });