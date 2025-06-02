import { scrollToFishInCarousel } from './aquarium.js';


// Création d'une classe que l'on peut inclure dans d'autres fichier js
export class Fish {

  // Constructeur
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

    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;

    this.x = Math.random() * (aquariumWidth - 60);
    this.y = Math.random() * (aquariumHeight - 40);

    fishEl.style.left = `${this.x}px`;
    fishEl.style.top = `${this.y}px`;

    fishEl.addEventListener("click", () => {
      scrollToFishInCarousel(this.name);
    });

    aquarium.appendChild(fishEl);

    this.startSwimming(fishEl, aquarium);

    return fishEl;
  }


  // Méthode qui s'occupe du déplacement du poisson
  startSwimming(fishEl, aquarium) {

    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;

    let angle = Math.random() * 2 * Math.PI;
    let speed = 1 + Math.random();

    const updatePosition = () => {
      
      this.x += Math.cos(angle) * speed;
      this.y += Math.sin(angle) * speed;

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

    // On répète
    this.animationFrame = requestAnimationFrame(updatePosition);
  };

  updatePosition();

  }

  stopSwimming() {
    clearInterval(this.swimInterval);
  }
}