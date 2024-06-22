import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  GridContainer,
  PokemonCard,
  PokemonImage,
} from "../styles/CommonStyles";
import { PokemonData, fetchPokemon } from "../api";

// css
const FavButton = styled.button<{ $isFav: boolean }>`
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  color: ${(props) => (props.$isFav ? "gold" : "grey")};
  font-size: 1.5rem;
`;

// user Profile
const Profile: React.FC = () => {
  const { token, fav } = useAuth();
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);

  useEffect(() => {
    const fetchFavPokemonData = async () => {
      if (fav.length > 0) {
        try {
          const pokemonDetailsPromises = fav.map((name) => fetchPokemon(name));
          const pokemonDetails = await Promise.all(pokemonDetailsPromises);
          setPokemonData(pokemonDetails);
        } catch (error) {
          console.error("Failed to fetch pokemon data", error);
        }
      }
    };
    fetchFavPokemonData();
  }, [fav]);

  if (!token) {
    return <p>Please sign up or log in.</p>;
  }
  return (
    <Container>
      <h2>Your Poketmon</h2>
      <GridContainer>
        {pokemonData.length > 0 ? (
          pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.name}>
              <FavButton $isFav={true} onClick={() => {}}>
                <FontAwesomeIcon icon={solidStar} />
              </FavButton>
              <h2>{pokemon.name}</h2>
              <Link to={`/pokemon/${pokemon.name}`}>
                <PokemonImage
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </Link>
              <p>
                Type:
                {pokemon.types.map((typeInfo) => typeInfo.type.name).join(",")}
              </p>
            </PokemonCard>
          ))
        ) : (
          <p>You have no favorite Pokemon.</p>
        )}
      </GridContainer>
    </Container>
  );
};

export default Profile;
