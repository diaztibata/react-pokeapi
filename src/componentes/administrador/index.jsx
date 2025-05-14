import { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // Asegúrate de importar correctamente tu cliente de Supabase

function Administrador() {
    const [usuarios, setUsuarios] = useState([]);
    const [fotos, setFotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);


    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                // Obtener los usuarios
                const { data: usuariosData, error: usuariosError } = await supabase
                    .from("usuario")
                    .select("id, nombre, correo, roll, telefono");

                // Obtener las fotos
                const { data: fotosData, error: fotosError } = await supabase
                    .from("multimedia")
                    .select("id, url, usuarioid");

                if (usuariosError || fotosError) {
                    console.error(usuariosError || fotosError);
                    return;
                }

                // Combinar usuarios y fotos
                const usuariosConFotos = usuariosData.map((usuario) => ({
                    ...usuario,
                    fotos: fotosData.filter((foto) => foto.usuarioid === usuario.id),
                }));

                setUsuarios(usuariosConFotos);
                setFotos(fotosData);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        obtenerDatos();
    }, []);

    const editarUsuario = async (id, nuevoNombre, nuevoCorreo, nuevoTelefono) => {
        try {
            const { error } = await supabase
                .from("usuario")
                .update({
                    nombre: nuevoNombre,
                    correo: nuevoCorreo,
                    telefono: nuevoTelefono,
                })
                .eq("id", id);

            if (error) {
                console.error(error);
            } else {
                // Actualiza los usuarios en el estado para reflejar los cambios
                setUsuarios((prev) =>
                    prev.map((usuario) =>
                        usuario.id === id
                            ? { ...usuario, nombre: nuevoNombre, correo: nuevoCorreo, telefono: nuevoTelefono }
                            : usuario
                    )
                );
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    const eliminarImagen = async (imagenId) => {
        try {
            const { error } = await supabase
                .from("multimedia")
                .delete()
                .eq("id", imagenId);

            if (error) {
                console.error("Error al eliminar la imagen:", error);
            } else {
                // Elimina la imagen del estado
                setFotos((prevFotos) => prevFotos.filter((foto) => foto.id !== imagenId));
            }
        } catch (error) {
            console.error("Error al eliminar la imagen:", error);
        }
    };

    const handleChange = (e, usuarioId, campo) => {
        const newValue = e.target.value;
        setUsuarios((prev) =>
            prev.map((usuario) =>
                usuario.id === usuarioId ? { ...usuario, [campo]: newValue } : usuario
            )
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-container">
            <h1>Administrador - Gestión de Usuarios y Multimedia</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Fotos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={usuario.nombre}
                                    onChange={(e) => handleChange(e, usuario.id, "nombre")}
                                />
                            </td>
                            <td>
                                {usuario.correo}
                            </td>
                            <td>
                                <input
                                    type="tel"
                                    value={usuario.telefono}
                                    onChange={(e) => handleChange(e, usuario.id, "telefono")}
                                />
                            </td>
                            <td>
                                {usuario.fotos.map((foto) => (
                                    <div key={foto.id} style={{ display: "inline-block", marginRight: "10px" }}>
                                        <img
                                            src={foto.url}
                                            alt={`Foto de ${usuario.nombre}`}
                                            style={{ width: "100px", height: "auto", marginBottom: "5px" }}
                                        />
                                        <button onClick={() => eliminarImagen(foto.id)}>Eliminar</button>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => editarUsuario(usuario.id, usuario.nombre, usuario.correo, usuario.telefono)}>
                                    Guardar Cambios
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Administrador;
