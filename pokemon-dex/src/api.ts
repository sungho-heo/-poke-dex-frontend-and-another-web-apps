import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const fetchPokemon = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};
