document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signup-btn');
    const resetBtn = document.getElementById('reset-btn');
    const nameInput = document.getElementById('name');
    const mobileInput = document.getElementById('mobile');
    const otpInput = document.getElementById('otp');
    const passwordInput = document.getElementById('password');
    const generateOtpBtn = document.getElementById('generate-otp');

    let generatedOtp = '';

    // Send OTP (mock functionality)
    generateOtpBtn.addEventListener('click', () => {
        const mobile = mobileInput.value;
        if (!mobile) {
            alert("Please enter your mobile number.");
            return;
        }

        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        alert(`OTP sent: ${generatedOtp}`);
    });

    // Sign up button event listener
    signupBtn.addEventListener('click', () => {
        const name = nameInput.value;
        const mobile = mobileInput.value;
        const otp = otpInput.value;
        const password = passwordInput.value;

        if (!name || !mobile || !otp || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (otp !== generatedOtp) {
            alert("Invalid OTP.");
            return;
        }

        // Create new user
        const newUser = {
            name,
            mobile,
            email: mobile, // Using mobile number as email (this can be adjusted as needed)
            password
        };

        // Save user to local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Account created successfully! You can now log in.");
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Reset button event listener
    resetBtn.addEventListener('click', () => {
        nameInput.value = '';
        mobileInput.value = '';
        otpInput.value = '';
        passwordInput.value = '';
    });
});
