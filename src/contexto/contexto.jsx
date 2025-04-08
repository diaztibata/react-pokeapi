import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [favoritos, setFavoritos] = useState(favoritosGuardados);

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
      }, [favoritos]);

    return (
        <AppContext.Provider value={{ favoritos, setFavoritos }}>
            {children}
        </AppContext.Provider>
    );
}
