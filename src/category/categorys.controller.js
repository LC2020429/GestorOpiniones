import Category from "./categorys.model.js";

export const saveCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const category = new Category({ categoryName });
    await category.save();

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al guardar la categoría",
      error: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { cid } = req.params;

    // Buscar la categoría por su ID y actualizar las vistas
    const category = await Category.findByIdAndUpdate(
      cid, 
      { $inc: { vistasCategory: 1 } }, // Incrementa las vistas en 1
      { new: true } // Retorna el documento actualizado
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener la categoría",
      error: err.message,
    });
  }
};


export const listCategories = async (req, res) => {
  try {
    const { limite = 20, desde = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    return res.status(200).json({
      success: true,
      total,
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las categorías",
      error: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { cid } = req.params;

    const category = await Category.findByIdAndUpdate(
      cid,
      { status: false },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categoría eliminada",
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar la categoría",
      error: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { cid } = req.params;
    const data = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(cid, data, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      success: true,
      message: "Categoría actualizada",
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al actualizar la categoría",
      error: err.message,
    });
  }
};
