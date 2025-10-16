const evaluateBtn = document.getElementById('evaluateBtn');
const passwordInput = document.getElementById('passwordInput');
const resultsDiv = document.getElementById('results');

function evaluatePassword(password) {
  // Basic scoring based on length
  let score = 0;
  if (!password) return { score: 0, suggestions: [], message: 'Password is empty' };
  // Length score
  score += Math.min(50, password.length * 2);
  // Has uppercase
  if (/[A-Z]/.test(password)) score += 10;
  // Has lowercase
  if (/[a-z]/.test(password)) score += 10;
  // Has digits
  if (/[0-9]/.test(password)) score += 10;
  // Has special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 10;
  // Detect common dictionary words (simple check)
  const commonWords = ['password','1234','admin','qwerty','letmein','welcome','monkey','dragon','hello'];
  let containsCommonWord = false;
  for (let word of commonWords) {
    if (password.toLowerCase().includes(word)) {
      containsCommonWord = true;
      break;
    }
  }
  let suggestions = [];
  if (containsCommonWord) {
    suggestions.push('Avoid common words, add complexity.');
  }
  if (score < 60) {
    suggestions.push('Increase password length, add special characters.');
  }
  // Cap score at 100
  score = Math.min(score, 100);
  return { score, suggestions };
}

function getColor(score) {
  if (score >= 80) return 'green';
  if (score >= 60) return 'orange';
  return 'red';
}

evaluateBtn.addEventListener('click', () => {
  const pwd = passwordInput.value;
  const result = evaluatePassword(pwd);
  resultsDiv.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'result';
  div.style.backgroundColor = getColor(result.score);
  div.innerHTML = `<strong>Score:</strong> ${result.score} <br/>`;
  if (result.suggestions.length > 0) {
    div.innerHTML += '<strong>Suggestions:</strong><ul>' + result.suggestions.map(s => `<li>${s}</li>`).join('') + '</ul>';
  }
  resultsDiv.appendChild(div);
});