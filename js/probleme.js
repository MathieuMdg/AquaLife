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

    // Fonction déclenchée à la fin du clic (fin du drag)
    const handleOnUp = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;

        setTimeout(() => isDragging = false, 50);
    };

    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("mouseup", handleOnUp);

    const images = document.querySelectorAll('#image-track .image');
    const overlay = document.getElementById('image-overlay');
    const zoomedImage = document.getElementById('zoomed-image');
    const zoomedText = document.getElementById('zoomed-text');
    const closeBtn = document.getElementById('close-btn');

    // Descriptions associées à chaque image
    const imageDescriptions = {
        0: "Pollution plastique : Chaque année, des millions de tonnes de plastique finissent dans les océans, affectant gravement la faune marine. Les tortues, les oiseaux de mer et les mammifères marins confondent souvent les plastiques avec de la nourriture, ce qui entraîne des blessures internes ou la mort. Des initiatives comme celle de l'association Sungai Watch à Bali installent des barrières filtrantes dans les rivières pour intercepter les déchets plastiques avant qu'ils n'atteignent la mer. À ce jour, ils collectent environ 3 tonnes de plastique par jour. Le Monde.fr, idverde.",
        1: "Surpêche : La surpêche déséquilibre les écosystèmes marins en réduisant drastiquement les populations de poissons, menaçant la biodiversité et les moyens de subsistance des communautés côtières. Pour y remédier, des pratiques de pêche durable et le développement de l'aquaculture responsable sont encouragés. L'aquaculture, si elle est bien gérée, peut alléger la pression sur les stocks sauvages tout en fournissant une source de protéines pour l'humanité. MSC International.",
        2: "Acidification des océans : L'absorption accrue de dioxyde de carbone par les océans entraîne une baisse du pH de l'eau, affectant les organismes marins, notamment les coraux et les mollusques. Cette acidification perturbe les chaînes alimentaires et les économies locales dépendantes de la pêche et du tourisme. Des solutions incluent la réduction des émissions de CO₂ et la restauration des écosystèmes marins capables de stocker le carbone, comme les herbiers marins. AIEA, Greenly, popsciences.universite-lyon.fr.",
        3: "Déversements d’hydrocarbures : Les marées noires causées par les déversements de pétrole ont des effets dévastateurs sur la vie marine, en contaminant les habitats et en empoisonnant les espèces. Des technologies avancées, telles que les dispersants biodégradables et les systèmes d'écrémage, sont utilisées pour atténuer les impacts. La prévention reste essentielle, avec des réglementations strictes sur le transport maritime et des plans d'intervention d'urgence. AQUAQUICK 2000 - Oil Spill Dispersant.",
        4: "Destruction des habitats marins : Les activités humaines comme le dragage, la construction côtière et la pollution détruisent les habitats essentiels tels que les récifs coralliens et les mangroves. Cette destruction réduit la biodiversité et la résilience des écosystèmes marins. La restauration de ces habitats, par exemple la replantation de coraux, est cruciale pour maintenir la santé des océans. Le Monde.fr.",
        5: "Espèces invasives : L'introduction d'espèces non indigènes perturbe les écosystèmes aquatiques en concurrençant ou en prédatant les espèces locales. Ces invasions peuvent être accidentelles, via les eaux de ballast des navires, ou intentionnelles. La surveillance, la prévention et, lorsque possible, l'éradication des espèces invasives sont essentielles pour protéger la biodiversité. parcs.canada.ca, Fisheries and Oceans Canada.",
        6: "Pollution sonore sous-marine : Les bruits générés par les activités humaines, tels que le trafic maritime et les explorations sismiques, perturbent la communication, la navigation et la reproduction des espèces marines. Bien que des lignes directrices existent pour réduire le bruit sous-marin, elles ne sont pas contraignantes. Des efforts sont nécessaires pour établir des réglementations internationales et développer des technologies plus silencieuses. Ministère de la Transition Écologique, Santé publique Belgique.",
        7: "Réchauffement climatique : Le changement climatique entraîne une élévation de la température des océans, provoquant des événements tels que le blanchissement des coraux et la montée du niveau de la mer. Ces changements affectent la distribution des espèces et la productivité des écosystèmes marins. La réduction des émissions de gaz à effet de serre et la protection des zones marines sont des mesures clés pour atténuer ces impacts. Le Monde.fr.",
        8: "Rejets d’eaux usées non traitées : Le déversement d'eaux usées non traitées dans les milieux aquatiques introduit des polluants et des agents pathogènes, mettant en danger la vie marine et la santé humaine. Le traitement adéquat des eaux usées et la mise en place d'infrastructures d'assainissement sont essentiels pour prévenir la contamination des écosystèmes aquatiques. NuWater."
    };

    // Ajoute un événement de clic à chaque image
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
