# CODTECH-INTERSHIP
#code for the password strength cheaker 
import re
import math
import random
import string

def check_password_strength(password):
    # Initialize strength metrics
    length_score = 0
    complexity_score = 0
    uniqueness_score = 0
    
    # Length check
    length = len(password)
    if length >= 8:
        length_score = 1
    if length >= 12:
        length_score = 2
    if length >= 16:
        length_score = 3

    # Complexity check
    character_set_size = 0
    if re.search(r"[A-Z]", password):
        complexity_score += 1
        character_set_size += 26
    if re.search(r"[a-z]", password):
        complexity_score += 1
        character_set_size += 26
    if re.search(r"\d", password):
        complexity_score += 1
        character_set_size += 10
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        complexity_score += 1
        character_set_size += 32

    # Uniqueness check
    if re.search(r"(.)\1\1", password):  # Check for triple repeated characters
        uniqueness_score = -1

    # Calculate total score
    total_score = length_score + complexity_score + uniqueness_score

    # Determine strength level
    if total_score >= 6:
        strength = "Very Strong"
    elif total_score >= 4:
        strength = "Strong"
    elif total_score >= 2:
        strength = "Moderate"
    else:
        strength = "Weak"

    # Provide feedback
    feedback = []
    if length_score == 0:
        feedback.append("Increase the length of your password.")
    if complexity_score < 4:
        feedback.append("Include uppercase, lowercase, numbers, and special characters.")
    if uniqueness_score == -1:
        feedback.append("Avoid repeating characters in your password.")
    
    # Estimate cracking time
    if character_set_size > 0:
        num_combinations = math.pow(character_set_size, length)
        cracking_speed = 1e9  # 1 billion attempts per second
        time_to_crack_seconds = num_combinations / cracking_speed

        # Convert time to human-readable format
        if time_to_crack_seconds < 60:
            time_to_crack = f"{time_to_crack_seconds:.2f} seconds"
        elif time_to_crack_seconds < 3600:
            time_to_crack = f"{time_to_crack_seconds / 60:.2f} minutes"
        elif time_to_crack_seconds < 86400:
            time_to_crack = f"{time_to_crack_seconds / 3600:.2f} hours"
        elif time_to_crack_seconds < 31536000:
            time_to_crack = f"{time_to_crack_seconds / 86400:.2f} days"
        else:
            time_to_crack = f"{time_to_crack_seconds / 31536000:.2f} years"
    else:
        time_to_crack = "N/A"

    return strength, feedback, time_to_crack

def enhance_password(password):
    # Capitalize the first letter
    if not re.search(r"[A-Z]", password):
        password = password.capitalize()
    
    # Add a special character if not already present
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        password += random.choice("!@#$%^&*")
    
    # Ensure the password is at least 12 characters long
    if len(password) < 12:
        password += ''.join(random.choice(string.ascii_letters + string.digits + string.punctuation) for _ in range(12 - len(password)))
    
    # Shuffle the password to improve randomness while maintaining recognizability
    password_list = list(password)
    random.shuffle(password_list)
    password = ''.join(password_list)
    
    # Ensure no consecutive characters are repeated more than twice
    while re.search(r"(.)\1\1", password):
        password_list = list(password)
        random.shuffle(password_list)
        password = ''.join(password_list)

    return password

# Test the function
password = input("Enter your password: ")
strength, feedback, time_to_crack = check_password_strength(password)

print(f"Password Strength: {strength}")
for comment in feedback:
    print(f"- {comment}")
print(f"Estimated Time to Crack: {time_to_crack}")

if strength in ["Weak", "Moderate"]:
    suggested_password = enhance_password(password)
    print("Suggested Strong Password: ", suggested_password)
