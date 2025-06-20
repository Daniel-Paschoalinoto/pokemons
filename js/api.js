import { renderizarPokemons } from './render.js';

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

export async function receberDadosPokemon() {
  try {
    loading.style.display = "block";

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

    renderizarPokemons(arrayDados, typeColors);
  } catch (error) {
    alert("Erro ao carregar os Pokémons. Tente novamente mais tarde.");
    console.error(error);
  } finally {
    loading.style.display = "none";
  }
}
