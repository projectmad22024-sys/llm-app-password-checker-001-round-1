# Password Strength Evaluator

This web application provides a simple interface to evaluate the strength of your password. It scores passwords from 0 to 100 points based on length, character variety, and common pattern detection. It also offers suggestions to improve password security.

## Features
- Enter a password to evaluate its strength.
- View real-time color-coded feedback indicating password strength:
  - Red: Weak
  - Orange: Moderate
  - Green: Strong
- Receive customized improvement suggestions.

## How to Use
1. Open the `index.html` file in a web browser.
2. Enter your desired password into the input box.
3. Click the 'Evaluate Password' button.
4. View the score and suggestions below the button.

## Implementation Details
- The scoring algorithm considers password length, inclusion of uppercase, lowercase, digits, and special characters.
- Detects common dictionary words as a simple heuristic to warn users.
- Uses simple color coding for visual feedback.

## Security Disclaimer
This tool performs basic password evaluation and is not a substitute for comprehensive password security solutions. Never store or share passwords insecurely.

---

*This project is a simple demonstration and does not guarantee password security.*
