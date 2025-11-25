// Sign In Form Validation Script

// Validate username
function validateUsername() {
    const username = document.getElementById('username').value.trim();
    const usernameMsg = document.getElementById('username-msg');
    
    if (username === '') {
        usernameMsg.textContent = 'Username is required';
        usernameMsg.style.color = 'red';
        return false;
    } else if (username.length < 3) {
        usernameMsg.textContent = 'Username must be at least 3 characters';
        usernameMsg.style.color = 'red';
        return false;
    } else {
        usernameMsg.textContent = '';
        return true;
    }
}

// Validate password
function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordMsg = document.getElementById('password-msg');
    
    if (password === '') {
        passwordMsg.textContent = 'Password is required';
        passwordMsg.style.color = 'red';
        return false;
    } else if (password.length < 6) {
        passwordMsg.textContent = 'Password must be at least 6 characters';
        passwordMsg.style.color = 'red';
        return false;
    } else {
        passwordMsg.textContent = '';
        return true;
    }
}

// Display username at the top of the page after successful sign in
function displayUsernameOnPage(username) {
    // Create a welcome banner
    const welcomeBanner = document.createElement('div');
    welcomeBanner.id = 'welcome-banner';
    welcomeBanner.style.cssText = `
        background: linear-gradient(135deg, #1a5f3a 0%, #2d8659 100%);
        color: white;
        padding: 15px 20px;
        text-align: center;
        font-size: 1.2em;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideDown 0.5s ease-out;
    `;
    welcomeBanner.innerHTML = `Welcome, ${username}! 🎉`;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert the banner at the top of the page (after header)
    const header = document.querySelector('.header');
    if (header && header.nextSibling) {
        header.parentNode.insertBefore(welcomeBanner, header.nextSibling);
    } else {
        document.body.insertBefore(welcomeBanner, document.body.firstChild);
    }
}

// Form submission handler
function handleSignInSubmit(event) {
    event.preventDefault();
    
    // Run validations
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    
    if (isUsernameValid && isPasswordValid) {
        const username = document.getElementById('username').value.trim();
        
        // Store username in localStorage
        localStorage.setItem('currentUser', username);
        
        // Display username at the top of the page
        displayUsernameOnPage(username);
        
        // Show success message
        alert('Sign in successful! Welcome, ' + username);
        
        // Optional: Redirect to survey page after a short delay
        setTimeout(function() {
            window.location.href = 'Survey.html';
        }, 2000);
    } else {
        alert('Please fix all validation errors before signing in.');
    }
}

// Initialize page
window.addEventListener('DOMContentLoaded', function() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const signInForm = document.getElementById('signin-form');
    
    // Add event listeners for real-time validation
    username.addEventListener('blur', validateUsername);
    password.addEventListener('blur', validatePassword);
    
    // Form submission
    signInForm.addEventListener('submit', handleSignInSubmit);
    
    // Check if user is already signed in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        displayUsernameOnPage(currentUser);
    }
});