function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const [strength, feedback, timeToCrack] = checkPasswordStrength(password);
    
    document.getElementById("strength").innerText = `Password Strength: ${strength}`;
    const feedbackList = document.getElementById("feedback");
    feedbackList.innerHTML = '';
    feedback.forEach(comment => {
        const listItem = document.createElement('li');
        listItem.innerText = comment;
        feedbackList.appendChild(listItem);
    });
    document.getElementById("timeToCrack").innerText = `Estimated Time to Crack: ${timeToCrack}`;
    
    if (strength === "Weak" || strength === "Moderate") {
        const suggestedPassword = enhancePassword(password);
        document.getElementById("suggestedPassword").innerText = suggestedPassword;
        document.getElementById("suggestedPasswordContainer").style.display = 'block';
    } else {
        document.getElementById("suggestedPasswordContainer").style.display = 'none';
    }
}

function checkPasswordStrength(password) {
    // The provided Python code should be converted to JavaScript here
    // Use regular expressions and logic to implement the same functionality
    // Example implementation:
    let lengthScore = 0;
    let complexityScore = 0;
    let uniquenessScore = 0;
    let characterSetSize = 0;
    
    // Length check
    const length = password.length;
    if (length >= 8) lengthScore = 1;
    if (length >= 12) lengthScore = 2;
    if (length >= 16) lengthScore = 3;
    
    // Complexity check
    if (/[A-Z]/.test(password)) {
        complexityScore += 1;
        characterSetSize += 26;
    }
    if (/[a-z]/.test(password)) {
        complexityScore += 1;
        characterSetSize += 26;
    }
    if (/\d/.test(password)) {
        complexityScore += 1;
        characterSetSize += 10;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        complexityScore += 1;
        characterSetSize += 32;
    }
    
    // Uniqueness check
    if (/(.)\1\1/.test(password)) uniquenessScore = -1;
    
    // Calculate total score
    const totalScore = lengthScore + complexityScore + uniquenessScore;
    
    // Determine strength level
    let strength;
    if (totalScore >= 6) {
        strength = "Very Strong";
    } else if (totalScore >= 4) {
        strength = "Strong";
    } else if (totalScore >= 2) {
        strength = "Moderate";
    } else {
        strength = "Weak";
    }
    
    // Provide feedback
    const feedback = [];
    if (lengthScore === 0) feedback.push("Increase the length of your password.");
    if (complexityScore < 4) feedback.push("Include uppercase, lowercase, numbers, and special characters.");
    if (uniquenessScore === -1) feedback.push("Avoid repeating characters in your password.");
    
    // Estimate cracking time
    let timeToCrack;
    if (characterSetSize > 0) {
        const numCombinations = Math.pow(characterSetSize, length);
        const crackingSpeed = 1e9; // 1 billion attempts per second
        const timeToCrackSeconds = numCombinations / crackingSpeed;
        
        if (timeToCrackSeconds < 60) {
            timeToCrack = `${timeToCrackSeconds.toFixed(2)} seconds`;
        } else if (timeToCrackSeconds < 3600) {
            timeToCrack = `${(timeToCrackSeconds / 60).toFixed(2)} minutes`;
        } else if (timeToCrackSeconds < 86400) {
            timeToCrack = `${(timeToCrackSeconds / 3600).toFixed(2)} hours`;
        } else if (timeToCrackSeconds < 31536000) {
            timeToCrack = `${(timeToCrackSeconds / 86400).toFixed(2)} days`;
        } else {
            timeToCrack = `${(timeToCrackSeconds / 31536000).toFixed(2)} years`;
        }
    } else {
        timeToCrack = "N/A";
    }
    
    return [strength, feedback, timeToCrack];
}

function enhancePassword(password) {
    if (!/[A-Z]/.test(password)) {
        password = password.charAt(0).toUpperCase() + password.slice(1);
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        password += '!@#$%^&*'[Math.floor(Math.random() * 8)];
    }
    
    if (password.length < 12) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        for (let i = password.length; i < 12; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    
    const passwordArray = password.split('');
    while (/(.)\1\1/.test(password)) {
        for (let i = 1; i < passwordArray.length - 1; i++) {
            if (passwordArray[i - 1] === passwordArray[i] && passwordArray[i] === passwordArray[i + 1]) {
                passwordArray[i + 1] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'.charAt(Math.floor(Math.random() * 70));
            }
        }
        password = passwordArray.join('');
    }
    
    return password;
}
