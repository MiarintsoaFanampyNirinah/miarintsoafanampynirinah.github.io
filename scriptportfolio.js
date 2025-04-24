function afficherProjet(id) {
  const projets = document.querySelectorAll(".projet-content");
  projets.forEach(projet => {
    if (projet.id === id) {
      projet.classList.remove("hidden");
    } else {
      projet.classList.add("hidden");
    }
  });
}
