import React from "react";
import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemon, PokemonData } from "../api";

const PokemonList: React.Fc = () => {
  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(20),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const pokemonQueries = useQueries({
    queries: (listData?.results || []).map((pokemon) => ({
      queryKey: ["pokemon", pokemon.name],
      queryFn: () => fetchPokemon(pokemon.name),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  }) as UseQueryResult<PokemonData>[];

  if (listLoading) return <div>...Loading</div>;
  if (listError instanceof Error) return <div>Error: {listError.message}</div>;

  return (
    <div>
      {pokemonQueries.map((query, index) => {
        const { data, error, isLoading } = query;

        if (isLoading) return <div key={index}>Loading...</div>;
        if (error instanceof Error)
          return <div key={index}>Error: {error.message}</div>;
        return (
          <div key={data?.name}>
            <h2>{data?.name}</h2>
            <img src={data?.sprites.front_default} alt={data?.name} />
            <p>
              Type:{data?.types.map((typeInfo) => typeInfo.type.name).join(",")}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
