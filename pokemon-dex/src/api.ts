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

interface Type {
  name: string;
  url: string;
}

interface PokemonTypeInfo {
  slot: number;
  type: Type;
}

export interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: PokemonTypeInfo[];
}

interface Name {
  language: {
    name: string;
  };
  name: string;
}

interface SpeciesData {
  names: Name[];
}

// 타입 데이터 타입 정의
interface TypeName {
  language: {
    name: string;
  };
  name: string;
}

interface TypeData {
  names: TypeName[];
}

export const fetchPokemonList = async (
  limit: number = 150
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

// 포켓몬 이름 한글화 작업을 하기위한 spcies data.
export const fetchPokemonSpecies = async (
  name: string
): Promise<SpeciesData> => {
  const response = await api.get(`/pokemon-species/${name}`);
  return response.data;
};

// 타입 데이터 가져오기 함수
export const fetchTypeData = async (url: string): Promise<TypeData> => {
  const response = await axios.get(url);
  return response.data;
};
