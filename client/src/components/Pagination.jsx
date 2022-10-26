import React from "react";
import "../styles/Pagination.css";

//* COMPONENTE

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
    <div class="pag-container">
      {/* Anterior Pág */}

      <div className='pg-cont-butt'>
        {currentPage !== 1 ? (
          <button onClick={() => pagination(currentPage - 1)}>
            {`< Anterior`}
          </button>
        ) : (
          <></>
        )}
      </div>

      {/* Lista Págs */}
      <div className='pag-cont-cards'>
        {pageNumbers?.map((n) => (
          <li key={n}>
            <button onClick={() => pagination(n)}>{n}</button>
          </li>
        ))}
      </div>
      {/* Siguiente Pág */}

      <div className='pg-cont-butt'>
        {currentPage < pageNumbers.length ? (
          <button onClick={() => pagination(currentPage + 1)}>
            {`Siguiente >`}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
