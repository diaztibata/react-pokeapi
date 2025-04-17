import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {

  const { favoritos, setFavoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay Pokémon favoritos aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((pokemon, index) => (
          <div className='c-lista-pokemon'
          onClick={() => navigate(`/detalle/${pokemon.id}`)}
          key={index}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
                  alt={`Pokémon ${pokemon.nombre}`} width='auto' height='60' loading='lazy'
                />
            <p>{pokemon.nombre}</p>
          </div>
        ))}
        </div>
      )}
    </>
    )
  }
  
  export default Favoritos