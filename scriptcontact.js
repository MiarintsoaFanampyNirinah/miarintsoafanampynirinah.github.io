// Sélecteurs pour les éléments
const words = [" développement de jeux ", " programmation ", " musique ", " projets 3D "];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const hamburgerMenu = document.querySelector('.hamburger-menu');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle');

// Fonctionnalité de la barre latérale
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

// Fonctionnalité du thème
function setThemeBasedOnTime() {
  const currentHour = new Date().getHours();
  const body = document.body;

  if (currentHour >= 5 && currentHour < 17) {
    body.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  }
}

function toggleTheme() {
  const body = document.body;
  if (themeToggle.checked) {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
  }
}

// Fonctionnalité de l'effet de frappe
function typeEffect() {
  const fullText = words[wordIndex];
  const displayText = isDeleting 
      ? fullText.substring(0, charIndex--) 
      : fullText.substring(0, charIndex++);

  document.getElementById("changing-text").textContent = displayText;

  const typingSpeed = isDeleting ? 100 : 150; // Ajuster la vitesse pour taper et effacer

  if (!isDeleting && charIndex === fullText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // Attendre avant d'effacer
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Passer au mot suivant
    setTimeout(typeEffect, 500); // Attendre avant de taper le mot suivant
  } else {
    setTimeout(typeEffect, typingSpeed);
  }
}

// Écouteurs d'événements
document.addEventListener("DOMContentLoaded", () => {
  // Configuration initiale pour le thème
  setThemeBasedOnTime();

  // Écouteurs d'événements pour les interactions avec la barre latérale
  hamburgerMenu.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  document.addEventListener('click', closeSidebarOnClickOutside);

  // Écouteurs d'événements pour les liens de la barre latérale
  const links = document.querySelectorAll('.sidebar ul li a');
  links.forEach((link) => {
    link.addEventListener('click', closeSidebar);
  });

  // Écouteur d'événements pour le basculement de thème
  themeToggle.addEventListener('change', toggleTheme);

  // Lancer l'effet de frappe
  typeEffect();
});


// Sélectionner l'élément du conteneur
const container = document.getElementById('container');

// Créer l'image
const pngImage = document.createElement('img');
pngImage.src = 'click.png';  // Remplace 'ton_image.png' par ton image PNG
pngImage.id = 'pngImage';
container.appendChild(pngImage);

// Ajouter un événement au clic sur toute la page
document.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Positionner l'image à l'endroit du clic
    pngImage.style.left = `${x - pngImage.width / 2}px`; // Centrer l'image sur le clic
    pngImage.style.top = `${y - pngImage.height / 2}px`;

    // Afficher l'image avec une opacité de 1
    pngImage.style.display = 'block';
    pngImage.style.opacity = 1;

    // Faire disparaître l'image après 0,3 seconde
    setTimeout(() => {
        pngImage.style.opacity = 0;
    }, 0); // Initialisation immédiate du fade

    // Cacher l'image après 0,3 seconde
    setTimeout(() => {
        pngImage.style.display = 'none';
    }, 300); // 0,3 seconde après le fade
});
