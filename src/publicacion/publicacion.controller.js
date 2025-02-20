import Publicacion from "./publicacion.model.js";

export const createPublicacion = async (req, res) => {
  try {
    const { title, textPubli, userPubli, categories } = req.body;

    const newPublicacion = new Publicacion({
      title,
      textPubli,
      userPubli,
      categories,
    });

    await newPublicacion.save();

    return res.status(201).json({
      success: true,
      message: "Publicación creada exitosamente",
      publicacion: newPublicacion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear la publicación",
      error: err.message,
    });
  }
};


export const updatePublicacion = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;

    const updatedPublicacion = await Publicacion.findByIdAndUpdate(pid, data, {
      new: true,
    });

    if (!updatedPublicacion) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Publicación actualizada exitosamente",
      publicacion: updatedPublicacion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la publicación",
      error: err.message,
    });
  }
};


export const getPublicacionById = async (req, res) => {
  try {
    const { pid } = req.params;
    const publicacion = await Publicacion.findById(pid)
      .populate("userPubli", "name")
      .populate("categories", "name");

    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      publicacion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener la publicación",
      error: err.message,
    });
  }
};

export const getPublicacionesByUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const publicaciones = await Publicacion.find({ userPubli: uid })
      .populate("categories", "name").sort({ createdAt: -1 }); 
    // sort({ createdAt: -1 }) ordena las publicaciones de más reciente a más antigua metodo de mongoose
    return res.status(200).json({
      success: true,
      total: publicaciones.length,
      publicaciones,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las publicaciones del usuario",
      error: err.message,
    });
  }
};
