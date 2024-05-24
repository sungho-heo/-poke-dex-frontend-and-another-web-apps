import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// 포켓몬 여러마리 데이터와 포켓몬의 상세 데이터 및 포켓몬 타입값의 타입 설정.
interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: PokemonType[];
}

export const fetchPokemonList = async (
  limit: number = 20
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}`
  );
  return response.data;
};

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  const response = await api.get<PokemonData>(`/pokemon/${name}`);
  return response.data;
};
