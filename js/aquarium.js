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

  // On récupère la balise <div></div> du fichier html
  const aquarium = document.getElementById("aquarium");

  // Choisir une espèce disponible (pas déjà dans l'aquarium)
  const available = fishTypes.filter(f => !activeSpecies.has(f.name));

  // On vérifie si le tableau avec les poissons disponibles n'est pas vide
  if (available.length === 0) {
    console.log("All species are already in the aquarium.");
    return;
  }

  // On choisit aléatoirement un poisson dans le tableau (l'aléatoire n'est pas obligatoire)
  const selected = available[Math.floor(Math.random() * available.length)];

  // On créé un objet de cette classe avec l'appel de cette fonction
  selected.createElement(aquarium);

  // On l'ajoute dans l'aquarium
  activeSpecies.add(selected.name);

}



// Faire apparaitre tous les poissons au chargement de la page
for (let i = 0; i < fishTypes.length; i++) {
  addFish();
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
