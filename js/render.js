import { imageCache, audioCache } from './cache.js';

export function renderizarPokemons(lista, typeColors) {
  const container = document.getElementById("pokedex");

  lista.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "card";

    const tipoPrincipal = pokemon.types[0].type.name;
    const corTipo = typeColors[tipoPrincipal] || "#777";

    card.style.setProperty("--border-color-hover", corTipo);

    const img = document.createElement("img");
    img.src = pokemon.backImg;
    img.alt = pokemon.nome;

    card.appendChild(img);

    const p = document.createElement("p");
    p.textContent = pokemon.nome;
    card.appendChild(p);

    let audio = null;

    card.addEventListener("mouseenter", () => {
      img.style.opacity = "0.85";
      card.style.borderColor = corTipo;

      if (imageCache[pokemon.frontImg]) {
        img.src = imageCache[pokemon.frontImg].src;
      } else {
        const frontImage = new Image();
        frontImage.src = pokemon.frontImg;
        frontImage.onload = () => {
          imageCache[pokemon.frontImg] = frontImage;
          img.src = frontImage.src;
        };
      }

      if (audioCache[pokemon.cry]) {
        audio = audioCache[pokemon.cry];
      } else {
        audio = new Audio();
        audio.src = pokemon.cry;
        audio.volume = 0.05;
        audio.load();
        audioCache[pokemon.cry] = audio;
      }
    });

    card.addEventListener("mouseleave", () => {
      img.src = pokemon.backImg;
      img.style.opacity = "1";
      card.style.borderColor = "black";
    });

    card.addEventListener("click", () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio = new Audio(pokemon.cry);
        audio.volume = 0.1;
        audio.play();
        audioCache[pokemon.cry] = audio;
      }

      card.classList.remove("clicked");
      void card.offsetWidth;
      card.classList.add("clicked");

      card.addEventListener(
        "animationend",
        () => {
          card.classList.remove("clicked");
        },
        { once: true }
      );
    });

    container.appendChild(card);
  });
}
