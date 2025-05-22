// script.js
const fishData = [
  {
    name: "clownfish",
    image: "../img/Clown.png",
  }
];



function addFish() {
    const aquarium = document.getElementById("aquarium");
    const aquariumWidth = aquarium.clientWidth;
    const aquariumHeight = aquarium.clientHeight;

    
  const fish = fishData[Math.floor(Math.random() * fishData.length)];

  const fishEl = document.createElement("div");
  fishEl.className = "fish";
  fishEl.style.backgroundImage = `url('${fish.image}')`;

  fishEl.style.left = Math.random() * (aquariumWidth - 60) + "px";
  fishEl.style.top = Math.random() * (aquariumHeight - 40) + "px";

  fishEl.onclick = () => {
    window.location.href = fish.infoPage;
  };

  aquarium.appendChild(fishEl);

  const interval = setInterval(() => {
    fishEl.style.left = Math.random() * (aquariumWidth - 60) + "px";
    fishEl.style.top = Math.random() * (aquariumHeight - 40) + "px";
  }, 2000);


  setTimeout(() => {
    clearInterval(interval);
    fishEl.remove();
  }, 60000);

}