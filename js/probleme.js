window.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");

    let isDragging = false;
    let dragStartX = 0;

    const handleOnDown = e => {
        track.dataset.mouseDownAt = e.clientX;
        dragStartX = e.clientX;
        isDragging = false;
    };

    const handleOnMove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const delta = Math.abs(e.clientX - dragStartX);
        if (delta > 5) isDragging = true;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        }
    };

    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;

        // Petit délai pour éviter faux clic juste après le drag
        setTimeout(() => isDragging = false, 50);
    };

    // Event listeners du carrousel
    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("mouseup", handleOnUp);

    // ZOOM IMAGE
    const images = document.querySelectorAll('#image-track .image');
    const overlay = document.getElementById('image-overlay');
    const zoomedImage = document.getElementById('zoomed-image');
    const zoomedText = document.getElementById('zoomed-text');
    const closeBtn = document.getElementById('close-btn');

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

    images.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            // Si on a glissé, on ne zoome pas
            if (isDragging) return;

            zoomedImage.src = img.src;
            zoomedText.textContent = imageDescriptions[index] || "Image sélectionnée";
            overlay.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});
