import React, { useState } from "react";

/**
 * SearchBar component for user input to search recipes.
 * @param {Object} props
 * @param {Function} props.onSearch - Function to be called when the search is executed.
 */
export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  /**
   * Handles the submission of the search form.
   * @param {Object} e - Event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-4">
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="border p-2 rounded-l"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
        Search
      </button>
    </form>
  );
}
