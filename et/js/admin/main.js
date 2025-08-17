document.addEventListener('DOMContentLoaded', function() {
    // Form ve modal elementlerini seç
    const postForm = document.getElementById('postForm');
    const postModal = document.getElementById('postModal');
    const newPostBtn = document.getElementById('newPostBtn');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');

    // Yeni yazı butonu tıklaması
    newPostBtn.addEventListener('click', () => {
        postForm.reset(); // Formu temizle
        postModal.classList.add('active'); // Modalı aç
    });

    // Modal kapatma butonları
    [closeModal, cancelBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                postForm.reset(); // Formu temizle
                postModal.classList.remove('active'); // Modalı kapat
            });
        }
    });

    // Form gönderimi
    postForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Formun normal gönderimini engelle

        // Form verilerini al
        const title = document.getElementById('postTitle').value;
        const category = document.getElementById('postCategory').value;
        const status = document.getElementById('postStatus').value;
        const excerpt = document.getElementById('postExcerpt').value;
        const content = document.getElementById('postContent').value;

        // Zorunlu alanları kontrol et
        if (!title || !category || !excerpt || !content) {
            alert('Lütfen tüm zorunlu alanları doldurun!');
            return;
        }

        // Yeni blog yazısı objesi oluştur
        const blogPost = {
            id: Date.now().toString(), // Benzersiz ID
            title: title,
            category: category,
            status: status,
            excerpt: excerpt,
            content: content,
            author: 'Admin',
            date: new Date().toLocaleDateString('tr-TR'),
            image: '../assets/images/blog/default.jpg',
            views: 0,
            comments: [],
            readingTime: Math.ceil(content.split(' ').length / 200)
        };

        try {
            // Mevcut blog yazılarını al
            let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            
            // Yeni yazıyı en başa ekle
            blogPosts.unshift(blogPost);
            
            // LocalStorage'a kaydet
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
            
            // Formu temizle ve modalı kapat
            postForm.reset();
            postModal.classList.remove('active');
            
            // Başarı mesajı göster
            alert('Blog yazısı başarıyla eklendi!');

            // Debug için konsola yaz
            console.log('Eklenen yazı:', blogPost);
            console.log('Tüm yazılar:', blogPosts);

            // Blog sayfasını güncelle için event tetikle
            window.dispatchEvent(new Event('storage'));
        } catch (error) {
            console.error('Blog yazısı eklenirken hata:', error);
            alert('Blog yazısı eklenirken bir hata oluştu!');
        }
    });

    // Çıkış butonu
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = '/admin/login.html';
        });
    }
}); 