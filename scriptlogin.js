let attempts = parseInt(localStorage.getItem('attempts')) || 0;
let isBlocked = localStorage.getItem('isBlocked') === 'true';

checkBlock();

function checkBlock() {
  if (isBlocked) {
    showBlocked();
    startCountdown();
  }
}

function flipCard(role) {
  const card = document.getElementById('card');
  const back = document.getElementById('back-content');

  if (role === 'admin') {
    back.innerHTML = `
      <img src="back.png" alt="Retour" class="back-icon" onclick="goBack()">
      <h2>Accès Admin</h2>
      <input type="password" placeholder="Mot de passe" id="password">
      <button onclick="submit('admin')">Se connecter</button>
    `;
  } else {
    back.innerHTML = `
      <img src="back.png" alt="Retour" class="back-icon" onclick="goBack()">
      <h2>Accès Équipe</h2>
      <input type="text" placeholder="ID" id="id">
      <input type="password" placeholder="Mot de passe" id="password">
      <button onclick="submit('team')">Se connecter</button>
    `;
  }

  card.classList.add('flipped');
}

function submit(role) {
  const id = role === 'team' ? document.getElementById('id').value : 'admin';
  const password = document.getElementById('password').value;

  if ((role === 'admin' && password === 'admin123') ||
      (role === 'team' && id === 'user' && password === 'team123')) {
    alert('Connexion réussie !');
    localStorage.removeItem('attempts');
    localStorage.removeItem('isBlocked');
    location.reload();
  } else {
    attempts++;
    localStorage.setItem('attempts', attempts);
    alert('Échec de connexion (' + attempts + '/3)');
    if (attempts >= 3) {
      blockAccess();
    }
  }
}

function blockAccess() {
  isBlocked = true;
  localStorage.setItem('isBlocked', 'true');
  showBlocked();
  startCountdown();
}

function showBlocked() {
  document.getElementById('main-container').classList.add('hidden');
  document.getElementById('blocked-screen').classList.remove('hidden');
}

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  let timeLeft = 10; // secondes

  updateCountdownDisplay(timeLeft);

  const interval = setInterval(() => {
    timeLeft--;
    updateCountdownDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(interval);
      unblockAccess();
    }
  }, 1000);
}

function updateCountdownDisplay(seconds) {
  const countdownElement = document.getElementById('countdown');
  countdownElement.textContent = `00:00:${pad(seconds)}`;
}

function unblockAccess() {
  isBlocked = false;
  attempts = 0;
  localStorage.removeItem('isBlocked');
  localStorage.removeItem('attempts');
  document.getElementById('blocked-screen').classList.add('hidden');
  document.getElementById('main-container').classList.remove('hidden');
}

function pad(seconds) {
  return seconds < 10 ? '0' + seconds : seconds;
}

function goBack() {
  const card = document.getElementById('card');
  card.classList.remove('flipped');
}

function showTooltip() {
  document.getElementById('tooltip').style.opacity = 1;
}

function hideTooltip() {
  document.getElementById('tooltip').style.opacity = 0;
}

function showHelp() {
  document.getElementById('help-panel').classList.remove('hidden');
}

function closeHelp() {
  document.getElementById('help-panel').classList.add('hidden');
}
