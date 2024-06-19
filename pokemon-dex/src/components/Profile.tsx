import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  GridContainer,
  PokemonCard,
  PokemonImage,
} from "../styles/CommonStyles";
import { PokemonData, fetchPokemon } from "../api";

// user Profile
const Profile: React.FC = () => {
  const { token, fav } = useAuth();
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // Fetch detailed pokemon data for each favorite
        const pokemonDetailsPromises = fav.map((name) => fetchPokemon(name));
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Failed to fetch pokemon data", error);
      }
    };

    if (token && fav.length > 0) {
      fetchPokemonData();
    }
  }, [token, fav]);

  if (!token) {
    return <p>Please sign up or log in.</p>;
  }
  return (
    <GridContainer>
      <h2>Your Poketmon</h2>
      {pokemonData.length > 0 ? (
        pokemonData.map((pokemon, index) => (
          <PokemonCard key={index}>
            <h3>{pokemon.name}</h3>
            <PokemonImage
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <p>
              Type: {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </PokemonCard>
        ))
      ) : (
        <p>You have no Poketmon.</p>
      )}
    </GridContainer>
  );
};

export default Profile;
