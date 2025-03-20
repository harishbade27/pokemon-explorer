"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Home = () => {
  // State variables
  const [pokemons, setPokemons] = useState([]); // Stores the fetched Pokémon list
  const [searchTerm, setSearchTerm] = useState(""); // Stores search input value
  const [offset, setOffset] = useState(0); // Tracks pagination offset
  const [loading, setLoading] = useState(true); // Manages loading state
  const [sortBy, setSortBy] = useState(""); // Sorting option (name or experience)
  const [filterType, setFilterType] = useState(""); // Filtering by Pokémon type
  const [pokemonDetails, setPokemonDetails] = useState([]); // Stores detailed Pokémon data
  const limit = 12; // Number of Pokémon displayed per page

  // Fetch Pokémon data when component mounts or offset changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch basic Pokémon data
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemonList = res.data.results;

        // Fetch detailed data for sorting and filtering
        const detailedData = await Promise.all(
          pokemonList.map(async (p) => {
            const detailsRes = await axios.get(p.url);
            return detailsRes.data;
          })
        );

        setPokemons(pokemonList);
        setPokemonDetails(detailedData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [offset]); // Re-fetch when offset changes

  // Filter Pokémon by name based on search input
  const filteredPokemons = pokemonDetails.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting
  if (sortBy === "name") {
    filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "base_experience") {
    filteredPokemons.sort((a, b) => (b.base_experience || 0) - (a.base_experience || 0));
  }

  // Apply filtering by type
  const finalPokemons = filterType
    ? filteredPokemons.filter((p) => p.types.some((t) => t.type.name === filterType))
    : filteredPokemons;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 md:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Pokémon Explorer</h1>

      {/* Search Input */}
      <div className="w-full flex justify-center px-4 md:px-6 lg:px-8 mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 md:w-80 lg:w-96 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 text-base"
        />
      </div>

      {/* Sorting & Filtering Options */}
      <div className="flex space-x-4 mb-6">
        {/* Sorting Dropdown */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="base_experience">Base Experience</option>
        </select>

        {/* Type Filtering Dropdown */}
        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg"
        >
          <option value="">Filter by Type</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
        </select>
      </div>

      {/* Loading Spinner (Displayed While Fetching Data) */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        // Pokémon Grid (Displays Pokémon List)
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 w-full max-w-5xl">
          {finalPokemons.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-20 h-20 mx-auto sm:w-24 sm:h-24"
                />
                <p className="mt-3 text-lg font-semibold capitalize text-gray-700">{pokemon.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="mt-6 flex space-x-4">
        {/* Previous Button */}
        <button
          disabled={offset === 0 || loading}
          onClick={() => setOffset(offset - limit)}
          className="relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          Previous
        </button>

        {/* Next Button */}
        <button
          disabled={loading}
          onClick={() => setOffset(offset + limit)}
          className="relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
        >
          Next
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
