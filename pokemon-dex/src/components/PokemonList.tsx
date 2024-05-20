import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api";

const PokemonList: React.Fc = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(20),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  if (isLoading) return <div>...Loading</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.results.map((pokemon) => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </div>
  );
};

export default PokemonList;
