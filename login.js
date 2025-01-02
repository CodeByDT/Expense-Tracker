document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const resetBtn = document.getElementById('reset-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Login button event listener
    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Fetch stored users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === username && u.password === password);

        if (user) {
            // Successful login, redirect to Expense Tracker
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Reset button event listener
    resetBtn.addEventListener('click', () => {
        usernameInput.value = '';
        passwordInput.value = '';
    });
});
