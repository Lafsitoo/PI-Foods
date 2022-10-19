import React from "react";

export default function Pagination({
  recipesPerPage,
  allRecipes,
  pagination,
  currentPage,
}) {
  const pageNumbers = [];
  // calculamos el núm de págs. ( Math.ceil = Redondear hacia arriba )
  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {/* Anterior Pág */}

      {currentPage !== 1 ? (
        <button onClick={() => pagination(currentPage - 1)}> {`< Anterior`} </button>
      ) : (
        <></>
      )}

      {/* Lista Págs */}

      <ul>
        {pageNumbers?.map((n) => (
          <li key={n}>
            <button onClick={() => pagination(n)}>{n}</button>
          </li>
        ))}
      </ul>

      {/* Siguiente Pág */}

      {currentPage < pageNumbers.length ? (
        <button onClick={() => pagination(currentPage + 1)}> {`Siguiente >`} </button>
      ) : (
        <></>
      )}
    </nav>
  );
}
