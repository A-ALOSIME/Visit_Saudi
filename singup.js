// Sign Up Form Validation Script


// Generate random CAPTCHA on page load
let captchaCode = '';

function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    captchaCode = '';
    for (let i = 0; i < 6; i++) {
        captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captcha-display').textContent = captchaCode;
}

// Calculate minimum valid date (18 years ago from today)
function getMinimumValidDate() {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return minDate.toISOString().split('T')[0];
}

// Validate password length in real-time
function validatePasswordLength(password) {
    const lengthMsg = document.getElementById('password-length-msg');
    if (password.length > 0 && password.length < 6) {
        lengthMsg.textContent = 'Password must be at least 6 characters';
        lengthMsg.style.color = 'red';
        return false;
    } else if (password.length >= 6) {
        lengthMsg.textContent = 'Password length is valid ✓';
        lengthMsg.style.color = 'green';
        return true;
    } else {
        lengthMsg.textContent = '';
        return false;
    }
}

// Validate password strength (must contain at least 1 number and 1 uppercase letter)
function validatePasswordStrength(password) {
    const strengthMsg = document.getElementById('password-strength-msg');
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    
    if (password.length === 0) {
        strengthMsg.textContent = '';
        return false;
    }
    
    if (!hasNumber || !hasUpperCase) {
        strengthMsg.textContent = 'Password must contain at least 1 number and 1 uppercase letter';
        strengthMsg.style.color = 'red';
        return false;
    } else {
        strengthMsg.textContent = 'Password strength is valid ✓';
        strengthMsg.style.color = 'green';
        return true;
    }
}

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const matchMsg = document.getElementById('password-match-msg');
    
    if (confirmPassword.length === 0) {
        matchMsg.textContent = '';
        return false;
    }
    
    if (password !== confirmPassword) {
        matchMsg.textContent = 'Passwords do not match';
        matchMsg.style.color = 'red';
        return false;
    } else {
        matchMsg.textContent = 'Passwords match ✓';
        matchMsg.style.color = 'green';
        return true;
    }
}

// Validate date of birth (must be 18+ years old)
function validateDateOfBirth() {
    const dob = document.getElementById('dob').value;
    const dobMsg = document.getElementById('dob-msg');
    
    if (!dob) {
        dobMsg.textContent = 'Please select your date of birth';
        dobMsg.style.color = 'red';
        return false;
    }
    
    const selectedDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();
    
    // Adjust age if birthday hasn't occurred this year
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? age - 1 : age;
    
    if (actualAge < 18) {
        dobMsg.textContent = 'You must be at least 18 years old';
        dobMsg.style.color = 'red';
        return false;
    } else {
        dobMsg.textContent = 'Age requirement met ✓';
        dobMsg.style.color = 'green';
        return true;
    }
}

// Validate semester (must be between 1 and 8)
function validateSemester() {
    const semester = document.getElementById('semester').value;
    const semesterMsg = document.getElementById('semester-msg');
    
    if (semester === 'graduate' || semester === 'other') {
        semesterMsg.textContent = '';
        return true;
    }
    
    const semesterNum = parseInt(semester);
    if (isNaN(semesterNum) || semesterNum < 1 || semesterNum > 8) {
        semesterMsg.textContent = 'Semester must be between 1 and 8';
        semesterMsg.style.color = 'red';
        return false;
    } else {
        semesterMsg.textContent = 'Valid semester ✓';
        semesterMsg.style.color = 'green';
        return true;
    }
}

// Validate CAPTCHA
function validateCaptcha() {
    const userCaptcha = document.getElementById('captcha-input').value;
    const captchaMsg = document.getElementById('captcha-msg');
    
    if (userCaptcha === '') {
        captchaMsg.textContent = 'Please enter the CAPTCHA';
        captchaMsg.style.color = 'red';
        return false;
    }
    
    if (userCaptcha !== captchaCode) {
        captchaMsg.textContent = 'CAPTCHA does not match. Please try again.';
        captchaMsg.style.color = 'red';
        return false;
    } else {
        captchaMsg.textContent = 'CAPTCHA verified ✓';
        captchaMsg.style.color = 'green';
        return true;
    }
}

// Form submission handler
function handleSignUpSubmit(event) {
    event.preventDefault();
    
    // Run all validations
    const password = document.getElementById('password').value;
    const isLengthValid = validatePasswordLength(password);
    const isStrengthValid = validatePasswordStrength(password);
    const isMatchValid = validatePasswordMatch();
    const isDobValid = validateDateOfBirth();
    const isSemesterValid = validateSemester();
    const isCaptchaValid = validateCaptcha();
    
    // Check if all validations pass
    if (isLengthValid && isStrengthValid && isMatchValid && isDobValid && isSemesterValid && isCaptchaValid) {
        // Store username in localStorage for sign-in page
        const username = document.getElementById('username').value;
        localStorage.setItem('signedUpUsername', username);
        
        alert('Sign up successful! Redirecting to sign in page...');
        window.location.href = 'signin.html';
    } else {
        alert('Please fix all validation errors before submitting.');
    }
}

// Initialize page
window.addEventListener('DOMContentLoaded', function() {
    // Generate CAPTCHA on page load
    generateCaptcha();
    
    // Set maximum date for date of birth (18 years ago)
    const dobInput = document.getElementById('dob');
    dobInput.max = getMinimumValidDate();
    
    // Add event listeners
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const dob = document.getElementById('dob');
    const semester = document.getElementById('semester');
    const captchaInput = document.getElementById('captcha-input');
    const refreshCaptcha = document.getElementById('refresh-captcha');
    const signUpForm = document.getElementById('signup-form');
    
    // Real-time password validation
    password.addEventListener('input', function() {
        validatePasswordLength(this.value);
        validatePasswordStrength(this.value);
        if (confirmPassword.value) {
            validatePasswordMatch();
        }
    });
    
    // Validate password match after user finishes typing confirm password
    confirmPassword.addEventListener('blur', validatePasswordMatch);
    confirmPassword.addEventListener('input', validatePasswordMatch);
    
    // Validate date of birth
    dob.addEventListener('change', validateDateOfBirth);
    
    // Validate semester
    semester.addEventListener('change', validateSemester);
    
    // Validate CAPTCHA
    captchaInput.addEventListener('blur', validateCaptcha);
    
    // Refresh CAPTCHA button
    refreshCaptcha.addEventListener('click', function(e) {
        e.preventDefault();
        generateCaptcha();
        document.getElementById('captcha-input').value = '';
        document.getElementById('captcha-msg').textContent = '';
    });
    
    // Form submission
    signUpForm.addEventListener('submit', handleSignUpSubmit);
});