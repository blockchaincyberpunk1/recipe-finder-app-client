import React from "react";

/**
 * Component to display a list of recipes.
 * @param {{ recipes: Array }} props - The props containing an array of recipe objects.
 */
export default function RecipeList({ recipes }) {
  if (!recipes) {
    return <p>No recipes found.</p>;
  }

  /**
   * Render a single recipe's detailed view.
   * @param {Object} recipe - The recipe object to render.
   * @return {JSX.Element} - The JSX element representing a single recipe.
   */
  const renderRecipe = (recipe) => {
    return (
      <div key={recipe.idMeal} className="border rounded p-4">
        <h3 className="font-bold">{recipe.strMeal}</h3>
        <img
          src={recipe.strMealThumb}
          alt={`${recipe.strMeal} image`}
          className="w-full"
        />
        <p>Category: {recipe.strCategory}</p>
        <p>Area: {recipe.strArea}</p>
        {recipe.strTags && <p>Tags: {recipe.strTags}</p>}
        {recipe.strYoutube && (
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        )}
        <p>Instructions: {recipe.strInstructions}</p>
        <p>Ingredients:</p>
        <ul>
          {getIngredients(recipe).map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        {/* Additional details can be added here */}
      </div>
    );
  };

  /**
   * Extracts and combines ingredients and their measures from the recipe.
   * @param {Object} recipe - The recipe object.
   * @return {Array<string>} - An array of combined ingredients and measures.
   */
  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {recipes.map((recipe) => renderRecipe(recipe))}
    </div>
  );
}
