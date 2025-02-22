export const isOwner = async (req, res, next) => {
  try {

    const { pid } = req.params;
    const { uid } = req.usuario;

    if (!req.usuario) {
      return res.status(500).json({
        success: false,
        message: "No se encontró el usuario autenticado",
      });
    }

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "No se encontró el ID del usuario en la sesión",
      });
    }

    const publicacion = await Publicacion.findById(pid);

    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    if (publicacion.userPubli.toString() !== uid.toString()) {
      return res.status(401).json({
        success: false,
        message: "No tienes permiso para eliminar esta publicación",
      });
    }

    next(); // El usuario es el propietario, continuar con la solicitud
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al verificar propietario de la publicación",
      error: err.message,
    });
  }
};
