import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import '../styles/index.css';

// Define the base URL of your back-end server
const BACKEND_BASE_URL = "http://localhost:3001";

/**
 * The Home component serves as the main page of the Recipe Finder App.
 * It includes functionality for searching recipes by name, first letter, random selection, or ingredient.
 */
export default function Home() {
  const [searchByName, setSearchByName] = useState("");
  const [searchByLetter, setSearchByLetter] = useState("");
  const [searchByIngredient, setSearchByIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches recipes based on the name search term.
   */
  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/recipes/search?s=${searchByName}`
      );
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      setError("Error fetching recipes");
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  /**
   * Fetches a random recipe.
   */
  const fetchRandomRecipe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/recipes/random`);
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      setError("Error fetching random recipe");
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  /**
   * Fetches recipes based on the first letter of their name.
   */
  const fetchRecipesByFirstLetter = async () => {
    if (searchByLetter.length !== 1) {
      setError("Please enter a single letter for this search");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/recipes/first-letter?f=${searchByLetter}`);
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      setError("Error fetching recipes by first letter");
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  /**
   * Fetches recipes based on a specified ingredient.
   */
  const fetchRecipesByIngredient = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/recipes/filter?i=${searchByIngredient}`);
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      setError("Error fetching recipes by ingredient");
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <SearchBar
        onSearch={() => fetchRecipes()}
        onInputChange={setSearchByName}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={fetchRandomRecipe}
        className="m-2 bg-blue-500 text-white p-2 rounded"
      >
        Get Random Recipe
      </button>

      <div className="m-2">
        <input
          type="text"
          placeholder="First Letter (e.g., 'A')"
          onChange={(e) => setSearchByLetter(e.target.value)}
          className="border p-2 rounded-l"
        />
        <button
          onClick={fetchRecipesByFirstLetter}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Search by First Letter
        </button>
      </div>

      <div className="m-2">
        <input
          type="text"
          placeholder="Ingredient (e.g., 'Chicken')"
          onChange={(e) => setSearchByIngredient(e.target.value)}
          className="border p-2 rounded-l"
        />
        <button
          onClick={fetchRecipesByIngredient}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Search by Ingredient
        </button>
      </div>

      <RecipeList recipes={recipes} />
    </div>
  );
}
