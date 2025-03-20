"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const PokemonDetail = () => {
  // Get Pokémon name from URL parameters
  const { name } = useParams();

  // State variables
  const [pokemon, setPokemon] = useState(null); // Stores Pokémon details
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch Pokémon data when component mounts or when 'name' changes
  useEffect(() => {
    async function fetchPokemon() {
      try {
        // Fetch Pokémon details from API
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    // Call API only if 'name' is available
    if (name) {
      fetchPokemon();
    }
  }, [name]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Show message if Pokémon is not found
  if (!pokemon) {
    return <p className="text-center text-red-500">Pokémon not found!</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      {/* Pokémon Name */}
      <h1 className="text-4xl font-bold capitalize text-gray-800">{pokemon.name}</h1>

      {/* Pokémon Image */}
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-60 h-60 my-6"
      />

      {/* Pokémon Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        {/* Pokémon Types */}
        <h2 className="text-xl font-semibold text-gray-700">Type(s)</h2>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className="px-3 py-1 bg-blue-500 text-white rounded-full">
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Pokémon Abilities */}
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Abilities</h2>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.abilities.map((a) => (
            <span key={a.ability.name} className="px-3 py-1 bg-green-500 text-white rounded-full">
              {a.ability.name}
            </span>
          ))}
        </div>

        {/* Pokémon Stats */}
        <h2 className="text-xl font-semibold text-gray-700 mt-4">Stats</h2>
        <ul className="mt-2">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="flex justify-between border-b py-2">
              <span className="capitalize text-gray-600">{stat.stat.name}</span>
              <span className="font-semibold text-gray-800">{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PokemonDetail;
