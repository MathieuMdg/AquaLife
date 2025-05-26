export class Fish {
  constructor(name, image, infoPage) {
    this.name = name;
    this.image = image;
    this.infoPage = infoPage;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
  }

  // Méthodes pour créer un poisson et l'ajouter dans l'aquarium
  createElement(aquarium) {
    const fishEl = document.createElement("div");
    fishEl.className = "fish";
    fishEl.style.backgroundImage = `url('${this.image}')`;

    // Récuperer les dimensions de l'aquarium
    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;

    // Générer la position initiale
    this.x = Math.random() * (aquariumWidth - 60);
    this.y = Math.random() * (aquariumHeight - 40);

    fishEl.style.left = `${this.x}px`;
    fishEl.style.top = `${this.y}px`;
    
    // Pour que quand l'utilisateur clique sur le poisson ça le redirige sur les informations de celui-ci
    fishEl.onclick = () => {
      window.location.href = this.infoPage;
    };

    // Ajoute le poisson dans l'aquarium
    aquarium.appendChild(fishEl);

    // Initialiser le déplacement du poisson
    this.startSwimming(fishEl, aquarium);

    return fishEl;
  }


  // Fonction qui s'occupe du déplacement du poisson
  startSwimming(fishEl, aquarium) {

    // Récupérer les dimensions de l'aquarium
    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;


    // Position, angle et vitesse aléatoire
    let angle = Math.random() * 2 * Math.PI;
    let speed = 1 + Math.random();

    const updatePosition = () => {
      
      // Changer la position
      this.x += Math.cos(angle) * speed;
      this.y += Math.sin(angle) * speed;

      // Ne pas toucher les murs
      if (this.x <= 0 || this.x >= aquariumWidth - 60) {
        angle = Math.PI - angle;
        fishEl.style.transform = `scaleX(${Math.cos(angle) > 0 ? 1 : -1})`;
      }
      if (this.y <= 0 || this.y >= aquariumHeight - 40) {
        angle = -angle;
      }

    fishEl.style.left = `${this.x}px`;
    fishEl.style.top = `${this.y}px`;

    const facingRight = Math.cos(Math.PI - angle) > 0;
    fishEl.style.transform = `scaleX(${facingRight ? 1 : -1})`;

    // En boucle
    this.animationFrame = requestAnimationFrame(updatePosition);
  };

  updatePosition();

  }

  stopSwimming() {
    clearInterval(this.swimInterval);
  }
}