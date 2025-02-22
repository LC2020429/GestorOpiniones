import User from "../user/user.model.js"
import Category from "../category/categorys.model.js"
import Publicacion from "../publicacion/publicacion.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoryExists = async (cid = "") => {
    const existe = await Category.findById(cid)
    if(!existe){
        throw new Error("No existe la categoría con el ID proporcionado")
    }
}

export const publicacionExists = async (pid = "") => {
    const existe = await Publicacion.findById(pid);
    if (!existe) {
        throw new Error("No existe la publicacion con el ID proporcionado");
    }
};


