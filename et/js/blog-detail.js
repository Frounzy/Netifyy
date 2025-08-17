// Blog detay sayfası için JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // İlgili blog yazıları için slider
    const relatedSlider = document.querySelector('.related-posts-slider');
    if (relatedSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        relatedSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - relatedSlider.offsetLeft;
            scrollLeft = relatedSlider.scrollLeft;
        });

        relatedSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });

        relatedSlider.addEventListener('mouseup', () => {
            isDown = false;
        });

        relatedSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - relatedSlider.offsetLeft;
            const walk = (x - startX) * 2;
            relatedSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Yorum formu işlevselliği
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const formData = new FormData(commentForm);
            const comment = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Yorum doğrulama
            if (!comment.name || !comment.email || !comment.message) {
                showNotification('Lütfen tüm alanları doldurun', 'error');
                return;
            }

            // Yorum başarılı bildirimi
            showNotification('Yorumunuz başarıyla gönderildi', 'success');
            commentForm.reset();
        });
    }

    // Bildirim gösterme fonksiyonu
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Paylaşım butonları işlevselliği
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = button.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            let shareUrl;
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Okuma süresi hesaplama
    function calculateReadingTime() {
        const content = document.querySelector('.blog-content');
        if (content) {
            const words = content.textContent.trim().split(/\s+/).length;
            const readingTime = Math.ceil(words / 200); // 200 kelime/dakika
            
            const readingTimeElement = document.querySelector('.reading-time');
            if (readingTimeElement) {
                readingTimeElement.textContent = `${readingTime} dk okuma`;
            }
        }
    }

    calculateReadingTime();
}); 