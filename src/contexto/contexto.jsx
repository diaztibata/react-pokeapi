import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    let totalPokes = 1025;
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [favoritos, setFavoritos] = useState(favoritosGuardados);

    const [data, setData] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('All');

    const capturadosGuardados = JSON.parse(localStorage.getItem("capturados")) || [];
    const [listaCapturados, setListaCapturados] = useState(capturadosGuardados);
  
    useEffect(() => {
      const obtenerDatos = async () => {
        if (tipoSeleccionado === 'All') {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
          const json = await res.json();
          setData(json.results);
        } else {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${tipoSeleccionado}`);
          const json = await res.json();
          const listaFiltrada = json.pokemon.map(p => p.pokemon);
          setData(listaFiltrada);
        }
      };
  
      obtenerDatos();
    }, [tipoSeleccionado]);


    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
      }, [favoritos]);

    useEffect(() => {
        localStorage.setItem("capturados", JSON.stringify(listaCapturados));
    }, [listaCapturados]);

    return (
        <AppContext.Provider value={{ 
        favoritos, setFavoritos, 
        data, setData, 
        tipoSeleccionado, setTipoSeleccionado, 
        listaCapturados, setListaCapturados,
        totalPokes
        }}>
            {children}
        </AppContext.Provider>
    );
}
