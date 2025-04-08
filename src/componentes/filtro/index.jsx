function Filtro({ onTipoChange }) {
    const tipos = [
      "All",
      "normal", "fighting", "flying", "poison", "ground", "rock",
      "bug", "ghost", "steel", "fire", "water", "grass", "electric",
      "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];
  
    return (
      <div className="c-filtro">
        {tipos.map((unTipo, index) => (
          <button className='' key={index} onClick={() => onTipoChange(unTipo)}>
            {unTipo}
          </button>
        ))}
      </div>
    );
  }
  
  export default Filtro;