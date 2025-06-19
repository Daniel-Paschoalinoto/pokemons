const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const loading = document.getElementById("loading");

async function receberDadosPokemon() {
  try {
    loading.style.display = "block"; // Mostrar o loader

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    const pokemons = data.results;
    const arrayDados = [];

    for (const pokemon of pokemons) {
      const res = await fetch(pokemon.url);
      const detalhes = await res.json();

      const nome = detalhes.name.charAt(0).toUpperCase() + detalhes.name.slice(1);
      const id = detalhes.id;
      const backImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${id}.gif`;
      const frontImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
      const cry = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
      const types = detalhes.types;

      arrayDados.push({ nome, backImg, frontImg, cry, types });
    }

    renderizarPokemons(arrayDados);
  } catch (error) {
    alert("Erro ao carregar os Pokémons. Tente novamente mais tarde.");
    console.error(error);
  } finally {
    loading.style.display = "none"; // Esconde o loader
  }
}

function renderizarPokemons(lista) {
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
      img.src = pokemon.frontImg;
      img.style.opacity = "0.85";
      card.style.borderColor = corTipo;

      if (!audio) {
        audio = new Audio(pokemon.cry);
        audio.volume = 0.05;
        audio.load();
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

receberDadosPokemon();
