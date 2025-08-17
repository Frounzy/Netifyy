// Tema değiştirme işlevselliği
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Kaydedilmiş temayı kontrol et
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        // Mevcut temayı kontrol et
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Temayı değiştir
        root.setAttribute('data-theme', newTheme);
        
        // Temayı localStorage'a kaydet
        localStorage.setItem('theme', newTheme);
        
        // İkonu güncelle
        updateIcon(newTheme === 'dark');
    });

    function updateIcon(isDark) {
        icon.classList.remove('fa-moon', 'fa-sun');
        icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
    }
}); 