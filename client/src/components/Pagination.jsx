import React from "react";

export default function Pagination({ recipesPerPage, allRecipes, pagination }) {
  const pageNumbers = [];
  // Math.ceil = Redondear hacia arriba
  for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
}
