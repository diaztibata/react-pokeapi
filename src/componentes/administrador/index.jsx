import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

function Administrador() {
    const [usuarios, setUsuarios] = useState([]);
    const [fotos, setFotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accesoPermitido, setAccesoPermitido] = useState(false);
    const navigate = useNavigate();

    // Verificar si el usuario está logueado y es admin
    useEffect(() => {
        const verificarAcceso = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                navigate("/");
                return;
            }

            const { data, error } = await supabase
                .from("usuario")
                .select("roll")
                .eq("id", user.id)
                .single();

            if (error || !data || data.roll !== "admin") {
                navigate("/");
                return;
            }

            setAccesoPermitido(true);
        };

        verificarAcceso();
    }, [navigate]);

    // Obtener datos solo si tiene acceso permitido
    useEffect(() => {
        if (!accesoPermitido) return;

        const obtenerDatos = async () => {
            try {
                const { data: usuariosData, error: usuariosError } = await supabase
                    .from("usuario")
                    .select("id, nombre, correo, roll, telefono");

                const { data: fotosData, error: fotosError } = await supabase
                    .from("multimedia")
                    .select("id, url, usuarioid");

                if (usuariosError || fotosError) {
                    console.error(usuariosError || fotosError);
                    return;
                }

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
    }, [accesoPermitido]);

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
                setFotos((prevFotos) => prevFotos.filter((foto) => foto.id !== imagenId));
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((usuario) => ({
                        ...usuario,
                        fotos: usuario.fotos.filter((foto) => foto.id !== imagenId),
                    }))
                );
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

    if (!accesoPermitido) return null;
    if (loading) return <div>Cargando...</div>;

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
                            <td>{usuario.correo}</td>
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
