NAME:DHEERAJ DONIKENA

COMPANY:CODETECH IT SOLUTIONS PVT LTD

ID:CT8CSEH1189

DOAMIN:CYBER SECUIRTY

DURATION:20 JUNE 2023 TO AUG 20 2023

MENTOR:SANTHOSH KUMAR

OVERVIEW OF PROJECT:### Theory and Technologies Used

#### **Theory**

1. **Password Strength Evaluation**:
   - **Length Check**: Longer passwords are generally more secure. This check assigns a score based on the number of characters in the password, recognizing that increasing length improves security.
   - **Complexity Check**: Passwords with a mix of uppercase letters, lowercase letters, digits, and special characters are harder to guess. Complexity is assessed by identifying the presence of these character types and adjusting the score accordingly.
   - **Uniqueness Check**: Repeated characters within a password reduce its strength. The script penalizes passwords with characters repeated three or more times in a row.
   - **Cracking Time Estimation**: Estimates how long it would take for a computer to brute-force the password. This estimation helps users understand the robustness of their password against automated attacks.

#### **Technologies Used**

1. **Python**:
   - **Role**: Programming language used to write the script.
   - **Function**: Handles logic for checking password length, complexity, uniqueness, and estimating cracking time.

2. **Regular Expressions (`re` module)**:
   - **Role**: Used for pattern matching within the password.
   - **Function**: Identifies different character types and sequences (e.g., uppercase letters, digits, repeated characters).

3. **Mathematics (`math` module)**:
   - **Role**: Used for calculations.
   - **Function**: Computes the number of possible password combinations and estimates cracking time based on character set size and password length.

4. **Python Libraries**:
   - **Regular Expressions Library (`re`)**: Facilitates complex pattern matching in strings.
   - **Math Library (`math`)**: Provides mathematical functions necessary for calculating combinations and cracking time.

This theory and technology combination provides a comprehensive method for evaluating and improving password strength by considering its length, complexity, and uniqueness, along with estimating potential cracking times.
