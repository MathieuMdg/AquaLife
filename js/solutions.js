// Attendre que le DOM soit complètement chargé avant d'exécuter le script
window.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("image-track");

    let isDragging = false;
    let dragStartX = 0;

    // Fonction déclenchée au clic de souris (début du drag)
    const handleOnDown = e => {
        track.dataset.mouseDownAt = e.clientX;
        dragStartX = e.clientX;
        isDragging = false;
    };

    // Fonction déclenchée lorsque la souris bouge
    const handleOnMove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const delta = Math.abs(e.clientX - dragStartX);
        if (delta > 5) isDragging = true;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        const maxDelta = window.innerWidth / 2;

        // Calcule le nouveau pourcentage de déplacement
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

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

        setTimeout(() => isDragging = false, 50);
    };

    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("mouseup", handleOnUp);

    // ---------------- ZOOM IMAGE ---------------- //

    const images = document.querySelectorAll('#image-track .image');
    const overlay = document.getElementById('image-overlay');
    const zoomedImage = document.getElementById('zoomed-image');
    const zoomedText = document.getElementById('zoomed-text');
    const closeBtn = document.getElementById('close-btn');

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

    images.forEach((img, index) => {
        img.addEventListener('click', (e) => {
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
