import { Fish } from "../js/fish.js";

const fishTypes = [
  new Fish(
    "Clownfish",
    "../img/Clown.png", "https://fishmusic.scot/"
  ),

  new Fish("Shark", "../img/Shark.png", "https://shark-helmets.com/fr_FR/")
];

const activeSpecies = new Set(); // Connaitre les espèces déjà présentent
function addFish() {
  const aquarium = document.getElementById("aquarium");

  // Choisir une espèce disponible (pas déjà dans l'aquarium)
  const available = fishTypes.filter(f => !activeSpecies.has(f.name));

  if (available.length === 0) {
    console.log("All species are already in the aquarium.");
    return;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  selected.createElement(aquarium);
  activeSpecies.add(selected.name);

}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addFishBtn").addEventListener("click", addFish);
});


// Faire apparaitre tous les poissons 
for (let i = 0; i < fishTypes.length; i++) {
  addFish();
}