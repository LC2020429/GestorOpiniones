import Publicacion from "./publicacion.model.js";
import Category from "../category/categorys.model.js";
import User from "../user/user.model.js";

export const createPublicacion = async (req, res) => {
  try {
    const { title, textPubli, userPubli, categories } = req.body;

    let categoriasAsignadas = categories;

    if (!categories || categories.length === 0) {
      const defaultCategory = await Category.findOne({
        categoryName: "Default",
      });

      if (!defaultCategory) {
        return res.status(500).json({
          success: false,
          message:
            "No se encontró la categoría por defecto. Verifica que esté creada en la base de datos.",
        });
      }

      categoriasAsignadas = [defaultCategory._id];
    }

    const newPublicacion = new Publicacion({
      title,
      textPubli,
      userPubli,
      categories: categoriasAsignadas,
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

    const updatedPublicacion = await Publicacion.findById(pid);

    if (!updatedPublicacion) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    if (
      updatedPublicacion.userPubli.toString() !== req.usuario._id.toString()
    ) {
      return res.status(401).json({
        success: false,
        message: "No tienes permiso para editar esta publicación",
      });
    }
    const updatedData = await Publicacion.findByIdAndUpdate(pid, data, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Publicación actualizada exitosamente",
      publicacion: updatedData,
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
      .populate("categories", "name")
      .sort({ createdAt: -1 });
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

export const deletePublicacion = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedPublicacion = await Publicacion.findByIdAndUpdate(
      pid,
      { status: false },
      { new: true }
    );
    if (!deletedPublicacion) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Publicación eliminada correctamente",
      publicacion: deletedPublicacion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la publicación",
      error: err.message,
    });
  }
};

export const getPublicacionesPublicas = async (req, res) => {
  try {
    const usuariosPublicos = await User.find({ estado: "PUBLICO" });

    if (usuariosPublicos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No hay usuarios públicos",
      });
    }

    const publicaciones = await Publicacion.find({
      userPubli: { $in: usuariosPublicos.map((user) => user._id) },
    })
      .populate("userPubli", "name")
      .populate("categories", "name")
      .sort({ createdAt: -1 });

    if (publicaciones.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron publicaciones públicas",
      });
    }

    return res.status(200).json({
      success: true,
      total: publicaciones.length,
      publicaciones,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las publicaciones públicas",
      error: err.message,
    });
  }
};
