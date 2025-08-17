document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.querySelector('.blog-grid');
    
    // Blog yazılarını görüntüle
    function displayBlogPosts() {
        blogGrid.innerHTML = blogPosts.map(post => `
            <div class="blog-post">
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <div class="post-category ${post.category}">${post.category}</div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span class="date">${post.date}</span>
                        <span class="read-time">${post.readTime} dk okuma</span>
                    </div>
                </div>
                </div>
        `).join('');
    }

    // Kategori filtreleme
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Aktif buton stilini güncelle
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Blog yazılarını filtrele
            if (category === 'all') {
                displayBlogPosts();
            } else {
                const filteredPosts = blogPosts.filter(post => post.category === category);
                blogGrid.innerHTML = filteredPosts.map(post => `
                    <div class="blog-post">
                        <div class="post-image">
                            <img src="${post.image}" alt="${post.title}">
                        </div>
                        <div class="post-content">
                            <div class="post-category ${post.category}">${post.category}</div>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <div class="post-meta">
                                <span class="date">${post.date}</span>
                                <span class="read-time">${post.readTime} dk okuma</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        });
    });

    // Sayfa yüklendiğinde tüm blog yazılarını göster
    displayBlogPosts();
}); 