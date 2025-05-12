export const isCreatingOwnPublication = async (req, res, next) => {
  try {
    const { _id } = req.usuario;

    if (!_id) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Usuario no identificado",
      });
    }   

    if (req.body.userPubli && req.body.userPubli !== _id.toString()) {
      return res.status(401).json({
        success: false,
        message: "No puedes crear publicaciones a nombre de otro usuario",
      });
    }

    // Fuerza que siempre se use el ID del token como autor
    req.body.userPubli = _id;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al verificar identidad del creador",
      error: err.message,
    });
  }
};
