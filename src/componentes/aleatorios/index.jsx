import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';

function Aleatorios() {
  const { data, listaCapturados ,setListaCapturados, setTipoSeleccionado } = useContext(AppContext);
  const [aleatorio, setAleatorio] = useState([])
  
  setTipoSeleccionado("All")

  const navigate = useNavigate();

  const generar = () => {
    let nuevosAleatorios = [];

    while (nuevosAleatorios.length < 4) {
      const index = Math.floor(Math.random() * data.length);
      nuevosAleatorios.push(data[index]);
    }
    setAleatorio(nuevosAleatorios);

    const nuevosIds = nuevosAleatorios.map(nuevoAleatorio => nuevoAleatorio.url.split("/")[6]).filter(id => !listaCapturados.includes(id));
    setListaCapturados(prev => [...prev, ...nuevosIds]);
  };

  return (
    <section className="c-aleatorio c-lista">
      {aleatorio.map((pokemon ,index) => (
        <div className="c-lista-pokemon c-un_aleatorio" 
        key={index}
        onClick={() => navigate(`/detalle/${pokemon.name}`)}
        >
          <p>{pokemon.url.split("/")[6]}</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`}
            alt={`Pokemon ${pokemon.name}`}
            width="60"
            height="60"
          />
          <p>{pokemon.name}</p>
        </div>
      ))}
      <button onClick={generar}>Generar</button>
    </section>
  );
}

export default Aleatorios;
