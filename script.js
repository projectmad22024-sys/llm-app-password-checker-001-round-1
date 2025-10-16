const dictionaryWords = ['password', '123456', 'qwerty', 'abc123', 'letmein', 'monkey', 'dragon', 'iloveyou', '1234', 'admin']; // Sample dictionary

function evaluatePassword() {
  const password = document.getElementById('passwordInput').value;
  const resultDiv = document.getElementById('result');

  if (!password) {
    resultDiv.innerHTML = '<p style="color: gray;">Please enter a password.</p>';
    return;
  }

  const score = scorePassword(password);
  const color = getColor(score);
  const suggestions = getSuggestions(password);

  let html = `<p class="score" style="color: ${color};">Score: ${score} / 100</p>`;
  if (suggestions.length > 0) {
    html += `<div class="suggestions"><strong>Suggestions:</strong><ul>`;
    suggestions.forEach(s => { html += `<li>${s}</li>`; });
    html += `</ul></div>`;
  }
  resultDiv.innerHTML = html;
}

function scorePassword(password) {
  let score = 0;
  // Length factor
  score += Math.min(10, password.length) * 5;
  // Diversity
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const varietyCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  score += varietyCount * 10;
  // Penalty for dictionary words
  const lowerPwd = password.toLowerCase();
  for (const word of dictionaryWords) {
    if (lowerPwd.includes(word)) {
      score -= 20;
      break;
    }
  }
  // Cap score
  if (score < 0) score = 0;
  if (score > 100) score = 100;
  return score;
}

function getColor(score) {
  if (score >= 80) return 'green';
  if (score >= 50) return 'orange';
  return 'red';
}

function getSuggestions(password) {
  const suggestions = [];
  if (password.length < 8) {
    suggestions.push('Increase password length to at least 8 characters.');
  }
  // Check for common weaknesses
  if (/^[A-Za-z]+$/.test(password)) {
    suggestions.push('Add numbers or special characters for complexity.');
  }
  const lowerPwd = password.toLowerCase();
  for (const word of dictionaryWords) {
    if (lowerPwd.includes(word)) {
      suggestions.push('Avoid common dictionary words.');
      break;
    }
  }
  if (/[^A-Za-z0-9]/.test(password) === false) {
    suggestions.push('Include special characters for better security.');
  }
  if (/\d/.test(password) === false) {
    suggestions.push('Include numbers.');
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    // no suggestion, already includes special characters
  }
  return suggestions;
}