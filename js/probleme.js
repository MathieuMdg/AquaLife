// Attendre que le DOM soit complètement chargé avant d'exécuter le script
window.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track"); // Élément contenant les images défilantes

    let isDragging = false; // Indique si un glissement est en cours
    let dragStartX = 0; // Position initiale du clic

    // Fonction déclenchée au clic de souris (début du drag)
    const handleOnDown = e => {
        track.dataset.mouseDownAt = e.clientX; // Stocke la position X du clic
        dragStartX = e.clientX; // Mémorise la position de départ
        isDragging = false; // Réinitialise l'état de drag
    };

    // Fonction déclenchée lorsque la souris bouge
    const handleOnMove = e => {
        if (track.dataset.mouseDownAt === "0") return; // Ne rien faire si aucun clic n'a eu lieu

        const delta = Math.abs(e.clientX - dragStartX); // Distance du glissement
        if (delta > 5) isDragging = true; // Si on dépasse 5px, considérer comme un drag

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX; // Différence entre la position initiale et actuelle
        const maxDelta = window.innerWidth / 2; // Valeur de référence pour le calcul du pourcentage

        // Calcule le nouveau pourcentage de déplacement
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100); // Contraint entre 0% et -100%

        track.dataset.percentage = nextPercentage; // Met à jour la position actuelle

        // Anime le déplacement du conteneur d'images
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        // Anime chaque image pour ajuster sa position d'objet (effet de parallaxe)
        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        }
    };

    // Fonction déclenchée à la fin du clic (fin du drag)
    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0"; // Réinitialise la position du clic
        track.dataset.prevPercentage = track.dataset.percentage; // Sauvegarde la position actuelle

        // Délai pour éviter qu'un clic juste après un drag déclenche une action non voulue
        setTimeout(() => isDragging = false, 50);
    };

    // Ajout des gestionnaires d'événements pour le drag horizontal
    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("mouseup", handleOnUp);

    // ---------------- ZOOM IMAGE ---------------- //

    const images = document.querySelectorAll('#image-track .image'); // Sélectionne toutes les images
    const overlay = document.getElementById('image-overlay'); // Fond sombre pour le zoom
    const zoomedImage = document.getElementById('zoomed-image'); // Image affichée en grand
    const zoomedText = document.getElementById('zoomed-text'); // Texte associé à l'image
    const closeBtn = document.getElementById('close-btn'); // Bouton pour fermer le zoom

    // Descriptions associées à chaque image
    const imageDescriptions = {
        0: "Description de la première image.",
        1: "Texte pour la deuxième image.",
        2: "Un plat savoureux.",
        3: "Repas gastronomique.",
        4: "Photo culinaire élégante.",
        5: "Déjeuner gourmet.",
        6: "Inspiration cuisine.",
        7: "Menu du jour.",
        8: "Chef's special."
    };

    // Ajoute un événement de clic à chaque image
    images.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            if (isDragging) return; // Si on est en train de glisser, on n’ouvre pas le zoom

            zoomedImage.src = img.src; // Affiche l'image cliquée
            zoomedText.textContent = imageDescriptions[index] || "Image sélectionnée"; // Affiche le texte associé
            overlay.style.display = 'flex'; // Affiche la superposition
        });
    });

    // Ferme l'overlay lorsque le bouton est cliqué
    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Ferme l'overlay si on clique en dehors de l'image
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});
