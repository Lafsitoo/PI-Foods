import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../redux/actions";
import lupa from "../resources/lupa.png";

//* COMPONENTE

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // el query será lo que tipea el usuario

  //* LOGICAS
  // seteara el espacio en blanco a el valor que le pasemos
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  // despachara el valor por medio de la acción del botton
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(name));
    setName("");
  }

  return (
    <div>
      <input
      value={name}
        type="text"
        placeholder="Buscar Receta..."
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
