document.addEventListener('DOMContentLoaded', function () {
    const bars = document.querySelectorAll('.progress-bar');

    bars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill'); // Récupère la valeur
        if (skillLevel) {
            const fillElement = bar.querySelector('.fill');
            fillElement.style.width = skillLevel + '%'; // Applique la largeur
        }
    });
});
