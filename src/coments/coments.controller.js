import Coment from "./coments.model.js";
import Publicacion from "../publicacion/publicacion.model.js";
import User from "../user/user.model.js";

export const createComent = async (req, res) => {
  try {
    const { textComent, publicacionComent } = req.body;
    const userWhoComent = req.usuario._id; // Este es el ID del usuario autenticado

    if (!userWhoComent) {
      return res.status(400).json({
        success: false,
        message: "El ID del usuario no está disponible",
      });
    }

    const publicacion = await Publicacion.findById(publicacionComent);
    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: "La publicación no existe",
      });
    }

    const newComent = new Coment({
      textComent,
      userWhoComent, // Aquí se usa el _id del usuario autenticado
      publicacionComent: [publicacionComent],
    });

    await newComent.save();

    return res.status(201).json({
      success: true,
      message: "Comentario creado exitosamente",
      coment: newComent,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el comentario",
      error: err.message,
    });
  }
};

export const updateComent = async (req, res) => {
  try {
    const { coid } = req.params;
    const { textComent } = req.body;

    const coment = await Coment.findById(coid);
    if (!coment) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado",
      });
    }

    if (coment.userWhoComent.toString() !== req.usuario._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "No tienes permiso para editar este comentario",
      });
    }

    coment.textComent = textComent;
    await coment.save();

    return res.status(200).json({
      success: true,
      message: "Comentario actualizado exitosamente",
      coment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el comentario",
      error: err.message,
    });
  }
};

export const deleteComentStatus = async (req, res) => {
  try {
    const { coid } = req.params;

    const coment = await Coment.findById(coid);
    if (!coment) {
      return res.status(404).json({
        success: false,
        message: "Comentario no encontrado",
      });
    }

    coment.status = !coment.status;
    await coment.save();

    return res.status(200).json({
      success: true,
      message: `Estado del comentario cambiado a ${
        coment.status ? "activo" : "inactivo"
      }`,
      coment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al cambiar el estado del comentario",
      error: err.message,
    });
  }
};

export const getComentsByPublicacion = async (req, res) => {
  try {
    const { pid } = req.params;

    const publicacion = await Publicacion.findById(pid);
    if (!publicacion) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    const comentarios = await Coment.find({
      publicacionComent: pid,
      status: true,
    })
      .populate("userWhoComent", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      comentarios,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los comentarios de la publicación",
      error: err.message,
    });
  }
};
