document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Güvenli giriş bilgileri
    const SECURE_USERNAME = "netify_admin";  // Yeni kullanıcı adı
    const SECURE_PASSWORD = "Netify2024!";   // Yeni şifre

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Kullanıcı adı ve şifre kontrolü
        if (username === SECURE_USERNAME && password === SECURE_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = '/admin/index.html';
        } else {
            alert('Kullanıcı adı veya şifre hatalı!');
        }
    });
}); 