document.addEventListener("DOMContentLoaded", () => {
  // --- Gestion du thème selon l'heure ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 17) {
    body.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  }

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
    }
  });

  // --- Sidebar (menu latéral) ---
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  function openSidebar() {
    sidebar.style.left = '20px';
  }

  function closeSidebar() {
    sidebar.style.left = '-350px';
  }

  function closeSidebarOnClickOutside(event) {
    const isClickInside = sidebar.contains(event.target) || hamburgerMenu.contains(event.target);
    if (!isClickInside) {
      closeSidebar();
    }
  }

  hamburgerMenu.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', closeSidebarOnClickOutside);

  document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // --- Lancer la vidéo principale si possible ---
  const aizaVideo = document.getElementById('aiza-video');
  if (aizaVideo) {
    aizaVideo.play().catch(() => {
      // Certains navigateurs bloquent autoplay sans interaction utilisateur
    });
  }

  // --- Pause des autres vidéos quand une commence ---
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    // Autoplay fonctionne mieux avec muted
    video.muted = true;

    video.addEventListener('play', () => {
      allVideos.forEach(other => {
        if (other !== video) {
          other.pause();
        }
      });
    });
  });

  // --- Effet de rotation sur cartes ---
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach(card => {
    const img = card.querySelector('img');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  // --- Effet de frappe dynamique ---
  const words = [" développement de jeux ", " programmation ", " musique ", " projets 3D "];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing"); // à toi d’avoir ce span dans ton HTML

  function typeEffect() {
    if (!typingElement) return;
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);

    typingElement.textContent = currentText;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 1500);
    }
  }

  typeEffect();
});

// --- Fonction pour afficher un projet (si utilisée ailleurs dans le HTML) ---
function afficherProjet(id) {
  const projets = document.querySelectorAll(".projet-content");
  projets.forEach(projet => {
    projet.classList.toggle("hidden", projet.id !== id);
  });
}
