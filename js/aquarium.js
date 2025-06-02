import { Fish } from "../js/fish.js";

// Déclaration d'un tableau avec tous les poissons
const fishTypes = [
  new Fish(
    "Clownfish",
    "../img/Clown.png", "https://fishmusic.scot/"
  ),

  new Fish(
    "Shark", 
    "../img/Shark.png",
     "https://shark-helmets.com/fr_FR/"),

  new Fish(
    "Thon rouge",
    "../img/ThonRouge.png",
    "html"
  )
];

// Tableau contenant les espèces déjà présentent dans l'aquarium
const activeSpecies = new Set(); 



// Fonction permettant d'ajouter des poissons dans l'aquarium
function addFish() {

  const aquarium = document.getElementById("aquarium");
  const available = fishTypes.filter(f => !activeSpecies.has(f.name));

  if (available.length === 0) {
    console.log("All species are already in the aquarium.");
    return;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  selected.createElement(aquarium);
  activeSpecies.add(selected.name);

}


const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

let currentIndex = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

export function scrollToFishInCarousel(fishName) {
  const index = Array.from(slides).findIndex(slide =>
    slide.dataset.fish === fishName
  );

  if (index !== -1) {
    currentIndex = index;
    updateCarousel();
  } else {
    console.warn(`Aucune slide trouvée pour le poisson : ${fishName}`);
  }
}


// Faire apparaitre tous les poissons au chargement de la page
for (let i = 0; i < fishTypes.length; i++) {
  addFish();
}