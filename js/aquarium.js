// Importer la classe Fish du fichier fish.js
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
     "https://shark-helmets.com/fr_FR/")
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

// Pour faire appraitre des poissons en appuyant sur un bouton (nous ne l'utilisons plus actuellement)
/* window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addFishBtn").addEventListener("click", addFish);
}); */


// Faire apparaitre tous les poissons au chargement de la page
for (let i = 0; i < fishTypes.length; i++) {
  addFish();
}