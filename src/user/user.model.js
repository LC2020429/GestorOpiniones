import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [25, "Name cannot exceed 25 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
    },
    profileDescription: {
      type: String,
      maxLength: [100, "Description cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      minLength: 8,
      maxLength: 8,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "USER",
      enum: ["ADMIN", "USER"],
    },
    status: {
      type: Boolean,
      default: true,
    },

    estado: {
      type: String,
      required: true,
      default: "PUBLICO",
      enum: ["PUBLICO", "PRIVADO"],
    },
    cuentaName: {
      type: String,
      maxLength: [25, "Name cannot exceed 25 characters"],
      unique: true,
      required: [true, "Name is required"],
    },
    publicaciones: [
      {
        type: Schema.Types.ObjectId,
        ref: "Publicacion",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("USER", userSchema);
