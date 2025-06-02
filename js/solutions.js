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
        0: "Installer des systèmes de collecte et promouvoir le zéro déchet : Des dispositifs comme des filets de rétention dans les rivières (ex : Sungai Watch à Bali) capturent les déchets avant qu'ils n’atteignent les océans. À côté de cela, le développement de politiques zéro plastique (interdiction des sacs, gobelets, emballages) et la généralisation du tri et du recyclage peuvent réduire la pollution à la source.",
        1: "Créer des quotas de pêche et des zones marines protégées : Imposer des quotas de pêche durables, surveillés par satellite ou balises, permet de laisser les populations de poissons se régénérer. De plus, les réserves marines protégées, où la pêche est interdite ou très limitée, jouent un rôle de “nurseries” pour les espèces menacées.",
        2: "Réduire les émissions de CO₂ et restaurer les écosystèmes bleus : La meilleure solution reste la réduction des émissions de gaz à effet de serre. Parallèlement, la restauration d’écosystèmes capables de stocker du carbone, comme les herbiers marins, les mangroves et les marais salants, peut ralentir l'acidification en capturant le CO₂.",
        3: "Renforcer la réglementation maritime et développer des solutions de nettoyage rapides : Mettre en place des normes de sécurité plus strictes pour les pétroliers, utiliser des technologies de détection pour prévenir les fuites et adopter des systèmes de nettoyage innovants (biorémédiation, bactéries dégradant le pétrole, mousse absorbante) peut limiter les dégâts.",
        4: "Protéger et restaurer les écosystèmes côtiers : Des programmes de restauration des coraux (greffes de coraux, structures artificielles), reforestation de mangroves et limitation de l’urbanisation côtière contribuent à préserver les habitats naturels. La sensibilisation des touristes et des pêcheurs est aussi essentielle.",
        5: "Renforcer le contrôle des eaux de ballast et créer des programmes d’éradication : Les navires peuvent traiter leurs eaux de ballast avec des UV ou des produits spécifiques avant de les rejeter. Dans certaines zones, des campagnes de capture ciblée ou de prédation naturelle (ex : encouragement à consommer le poisson-lion dans les Caraïbes) limitent la prolifération.",
        6: "Réduire le bruit des moteurs et réguler les activités bruyantes : Développer des navires à propulsion silencieuse, établir des zones de silence marin, limiter les exercices militaires et les forages dans les périodes de reproduction des cétacés sont autant de pistes. Des balises acoustiques avertissent aussi les animaux de l’approche de bateaux.",
        7: "Limiter les émissions et renforcer la résilience des océans : Réduire la consommation d’énergie fossile est central. Mais aussi, favoriser les aires marines protégées et la restauration des récifs permet aux écosystèmes de mieux résister au stress thermique. L’éducation et l’investissement dans des solutions climatiques bleues (océan + climat) sont clés.",
        8: "Construire des stations d’épuration et moderniser les réseaux d’assainissement : Installer des stations d'épuration écologiques (zones humides artificielles, filtres à roseaux, etc.) permet de traiter les eaux avant leur rejet. Il faut aussi interdire les déversements directs et sensibiliser à ne pas jeter de produits toxiques ou médicaux dans les toilettes."
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
